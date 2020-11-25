using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using Server.Data;
using Server.Models;

namespace Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize(Roles = "Admin")]
    public class AdminController : ControllerBase
    {
        private readonly EmbeddedStockContext _context;
        private readonly ILogger<AdminController> _logger;

        public AdminController(EmbeddedStockContext context, ILogger<AdminController> logger)
        {
            _context = context;
            _logger = logger;
        }

        // GET: api/Admin/5
        [HttpGet("{id}")]
        public async Task<User> Get(string id)
        {
            var user = await _context.Users.FindAsync(id);
            var reservations = await _context.Reservations.Where(x => x.UserId == user.Id).ToListAsync();
            var loans = await _context.Loans.Where(x => x.UserId == user.Id).ToListAsync();

            user.Reservations = new List<Reservation>();
            user.Loans = new List<Loan>();

            if (reservations != null)
            {
                foreach (var reservation in reservations)
                {
                    user.Reservations.Add(reservation);
                }
            }
            if (loans != null)
            {
                foreach (var loan in loans)
                {
                    user.Loans.Add(loan);
                }
            }

            _logger.LogInformation($"{User.Identity.Name} viewed: {user.AuId} - {user.Id}");

            return user;
        }

        // POST: api/Admin
        [HttpPost]
        public async Task<IActionResult> Post([FromBody] User data)
        {
            if (data == null) throw new ArgumentNullException(nameof(data));

            var user = new User
            {
                Id = Guid.NewGuid().ToString(),
                AuId = data.AuId,
                Email = data.Email,
                FirstName = data.FirstName,
                LastName = data.LastName,
                PhoneNumber = data.PhoneNumber,
                Role = data.Role,
                StudentNumber = data.StudentNumber
            };

            await _context.Users.AddAsync(user);
            await _context.SaveChangesAsync();

            _logger.LogInformation($"{User.Identity.Name} created: {user.AuId} - {user.Id}");

            return Ok();
        }

        // PUT: api/Admin/5
        [HttpPut("{id}")]
        public async Task<IActionResult> Put(string id, [FromBody] User data)
        {
            if (data == null) throw new ArgumentNullException(nameof(data));
            var user = await _context.Users.FindAsync(id);

            user.AuId = data.AuId;
            user.StudentNumber = data.StudentNumber;
            user.Email = data.Email;
            user.FirstName = data.FirstName;
            user.LastName = data.LastName;
            user.PhoneNumber = data.PhoneNumber;
            user.Role = data.Role;

            _context.Users.Update(user);
            await _context.SaveChangesAsync();

            _logger.LogInformation($"{User.Identity.Name} updated: {user.AuId} - {user.Id}");

            return Ok();
        }

        // DELETE: api/Admin/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(string id)
        {
            var user = await _context.Users.FindAsync(id);

            _context.Users.Remove(user);
            await _context.SaveChangesAsync();

            _logger.LogInformation($"{User.Identity.Name} deleted: {user.AuId} - {user.Id}");

            return Ok();
        }
    }
}