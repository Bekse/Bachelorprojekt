using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using Server.Data;
using Server.Enums;
using Server.Models;

namespace Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class LoansController : ControllerBase
    {
        private readonly EmbeddedStockContext _context;
        private readonly ILogger<LoansController> _logger;

        public LoansController(EmbeddedStockContext context, ILogger<LoansController> logger)
        {
            _context = context;
            _logger = logger;
        }

        // GET: api/Loans/5
        [HttpGet("{id}")]
        public async Task<Loan> Get(string id)
        {
            return await _context.Loans.FindAsync(id);
        }

        // GET: api/Loans
        [HttpGet]
        public async Task<List<Loan>> Get()
        {
            var user = await _context.Users.FindAsync(User.Identity.Name);
            return await _context.Loans.Where(x => x.UserId == user.Id).ToListAsync();
        }

        // POST: api/Loans/5
        [HttpPost("{id}")]
        [Authorize(Roles = "Admin, Clerk")]
        public async Task<IActionResult> Post(string id, [FromBody] Loan loan)
        {
            if (loan == null) throw new ArgumentNullException(nameof(loan));

            var user = await _context.Users.FindAsync(id);
            if (user == null) throw new ArgumentNullException(nameof(user));

            var component = _context.Components.Where(x => x.ComponentId == loan.ComponentId)
                .Include(x => x.History).FirstOrDefaultAsync().Result;
            if (component == null) throw new ArgumentNullException(nameof(component));

            var reservation = await _context.Reservations.FirstOrDefaultAsync(x => x.ComponentId == component.ComponentId);

            loan.LoanId = Guid.NewGuid().ToString();
            loan.ComponentId = component.ComponentId;
            loan.ComponentName = component.ComponentName;
            loan.ComponentNumber = component.ComponentNumber;
            loan.UserId = user.Id;
            loan.LoanDate = DateTime.Now.ToString("MM/dd/yyyy HH:mm:ss");
            loan.ReturnDate = DateTime.Today.AddDays(30).ToString("MM/dd/yyyy HH:mm:ss");

            component.History.LastLoaned = loan.LoanDate;
            component.History.TimesLoaned += 1;

            if (component.Count != 0) { component.Count--; }
            component.ComponentStatus = component.Count == 0 ? Status.NotAvailable.ToString() : Status.Available.ToString();
            if (component.Count == 0) { component.History.TimesUnavailable++; }

            if (reservation != null)
            {
                reservation.Loaned = true; 
                _context.Reservations.Update(reservation);
            }

            _context.Components.Update(component);
            await _context.Loans.AddAsync(loan);
            await _context.SaveChangesAsync();

            _logger.LogInformation($"{User.Identity.Name} loaned: {component.ComponentName} - {component.ComponentId} to {user.AuId}");

            return Ok();
        }

        // PUT: api/Loans/5
        [HttpPut("{id}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> Put(string id, [FromBody] Loan data)
        {
            if (data == null) throw new ArgumentNullException(nameof(data));
            var loan = await _context.Loans.FirstOrDefaultAsync(x => x.UserId == id);
            if (loan == null) throw new ArgumentNullException(nameof(loan));

            loan.ReturnDate = data.ReturnDate;
            loan.AdminComment = data.AdminComment;

            _context.Loans.Update(loan);
            await _context.SaveChangesAsync();

            _logger.LogInformation($"{User.Identity.Name} updated: {loan.LoanId}");

            return Ok();
        }

        // DELETE: api/Loans/5
        [HttpDelete("{id}")]
        [Authorize(Roles = "Admin, Clerk")]
        public async Task<IActionResult> Delete(string id)
        {
            var loan = await _context.Loans.FindAsync(id);
            if (loan == null) throw new ArgumentNullException(nameof(loan));
            var component = await _context.Components.FindAsync(loan.ComponentId);
            if (component == null) throw new ArgumentNullException(nameof(component));

            component.Count += 1;
            component.ComponentStatus = component.Count == 0 ? Status.NotAvailable.ToString() : Status.Available.ToString();

            _context.Loans.Remove(loan);
            _context.Components.Update(component);
            await _context.SaveChangesAsync();

            _logger.LogInformation($"{User.Identity.Name} deleted: {loan.LoanId}");

            return Ok();
        }
    }
}