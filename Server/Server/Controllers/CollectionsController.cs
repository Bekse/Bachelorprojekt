using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using Server.Data;
using Server.Models;

namespace Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize(Roles = "Admin, Clerk")]
    public class CollectionsController : ControllerBase
    {
        private readonly EmbeddedStockContext _context;
        private readonly ILogger<CollectionsController> _logger;

        public CollectionsController(EmbeddedStockContext context, ILogger<CollectionsController> logger)
        {
            _context = context;
            _logger = logger;
        }

        // GET: api/Collections/5
        [HttpGet("{id}")]
        public async Task<Collection> Get(string id)
        {
            var user = await _context.Users.FindAsync(id);
            var reservations = await _context.Reservations.Where(x => x.UserId == user.Id).ToListAsync();
            var loans = await _context.Loans.Where(x => x.UserId == user.Id).ToListAsync();

            var collection = new Collection { Loans = new List<Loan>(), Reservations = new List<Reservation>() };

            if (reservations != null)
            {
                foreach (var reservation in reservations)
                {
                    collection.Reservations.Add(reservation);
                }
            }
            if (loans != null)
            {
                foreach (var loan in loans)
                {
                    collection.Loans.Add(loan);
                }
            }

            _logger.LogInformation($"{User.Identity.Name} viewed: {user.AuId} - {user.Id}");

            return collection;
        }
    }
}