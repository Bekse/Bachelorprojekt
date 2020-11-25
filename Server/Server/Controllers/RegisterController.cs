using System;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using Serilog;
using Server.Data;
using Server.Enums;
using Server.Interfaces;
using Server.Models;

namespace Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RegisterController : ControllerBase
    {
        private readonly EmbeddedStockContext _context;
        private readonly ILdapUtilities _ldapUtilities;
        private readonly ILogger<RegisterController> _logger;

        // Constructor
        public RegisterController(EmbeddedStockContext context, ILdapUtilities ldapUtilities, ILogger<RegisterController> logger)
        {
            _context = context;
            _ldapUtilities = ldapUtilities;
            _logger = logger;
        }

        // POST: api/Register
        [HttpPost]
        public async Task<IActionResult> Register([FromBody] Register data)
        {
            if (data == null) throw new ArgumentNullException(nameof(data));
            if (!_ldapUtilities.IsAuthenticated(data.AuId, data.Password)) return null;

            var existing = await _context.Users.FirstOrDefaultAsync(x => x.AuId == data.AuId);
            if (existing != null) { throw new Exception("User already exists.");}

            var user = new User
            {
                Id = Guid.NewGuid().ToString(),
                AuId = data.AuId,
                FirstName = data.FirstName,
                LastName = data.LastName,
                Email = data.Email,
                StudentNumber = data.StudentNumber,
                PhoneNumber = data.PhoneNumber,
                Role = Role.Student.ToString()
            };

            await _context.AddAsync(user);
            await _context.SaveChangesAsync();

            _logger.LogInformation($"{user.AuId} registered.");

            return Ok();
        }
    }
}