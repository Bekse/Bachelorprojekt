using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;
using Server.Data;
using Server.Enums;
using Server.Models;

namespace Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class ReservationsController : ControllerBase
    {
        private readonly EmbeddedStockContext _context;
        private readonly ILogger<ReservationsController> _logger;

        public ReservationsController(EmbeddedStockContext context, ILogger<ReservationsController> logger)
        {
            _context = context;
            _logger = logger;
        }

        // GET: api/Reservations/userId
        [HttpGet("{id}")]
        public async Task<Reservation> Get(string id)
        {
            return await _context.Reservations.FindAsync(id);
        }

        // GET: api/Reservations
        [HttpGet]
        public async Task<List<Reservation>> Get()
        {
            var user = await _context.Users.FindAsync(User.Identity.Name);
            return await _context.Reservations.Where(x => x.UserId == user.Id).ToListAsync();
        }

        // POST: api/Reservations
        [HttpPost]
        public async Task<IActionResult> Post(Reservation reservation)
        {
            if (reservation == null) throw new ArgumentNullException(nameof(reservation));
            var user = await _context.Users.FindAsync(User.Identity.Name);
            if (user == null) throw new ArgumentNullException(nameof(user));
            var component = _context.Components.Where(x => x.ComponentId == reservation.ComponentId)
                .Include(x => x.History).FirstOrDefaultAsync().Result;
            if (component == null) throw new ArgumentNullException(nameof(component));

            reservation.ReservationId = Guid.NewGuid().ToString();
            reservation.ComponentName = component.ComponentName;
            reservation.ReservationDate = DateTime.Now.ToString("MM/dd/yyyy HH:mm:ss");
            reservation.UserId = user.Id;
            reservation.ComponentId = component.ComponentId;
            reservation.ComponentInfo = component.ComponentInfo;
            reservation.AdminComment = component.AdminComment;
            reservation.ComponentNumber = component.ComponentNumber;
            reservation.ReservedTo = $"{user.AuId} {user.FirstName} {user.LastName}";

            if (component.Count != 0) { component.Count--; }
            component.ComponentStatus = component.Count == 0 ? Status.NotAvailable.ToString() : Status.Available.ToString();
            component.History.TimesReserved += 1;

            var json = JsonConvert.SerializeObject(reservation.ReservationId, Formatting.Indented);

            _context.Components.Update(component);
            await _context.Reservations.AddAsync(reservation);
            await _context.SaveChangesAsync();

            _logger.LogInformation($"{User.Identity.Name} reserved: {reservation.ComponentName} - {reservation.ReservationId}");

            return Ok(json);
        }

        // DELETE: api/Reservations/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(string id)
        {
            var reservation = await _context.Reservations.FindAsync(id);
            if (reservation == null) throw new ArgumentNullException(nameof(reservation));
            var component = await _context.Components.FindAsync(reservation.ComponentId);
            if (component == null) throw new ArgumentNullException(nameof(component));

            if (!reservation.Loaned) { component.Count++; }
            component.ComponentStatus = component.Count == 0 ? Status.NotAvailable.ToString() : Status.Available.ToString();

            _context.Components.Update(component);
            _context.Reservations.Remove(reservation);
            await _context.SaveChangesAsync();

            _logger.LogInformation($"{User.Identity.Name} deleted: {reservation.ComponentName} - {reservation.ReservationId}");

            return Ok();
        }
    }
}