using System;
using Microsoft.AspNetCore.Mvc;
using Server.Data;
using Server.Interfaces;
using Server.Models;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using Serilog;
using Server.Enums;

namespace Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LoginController : ControllerBase
    {
        private readonly EmbeddedStockContext _context;
        private readonly ITokenService _tokenService;
        private readonly ILdapUtilities _ldapUtilities;
        private readonly ILogger<LoginController> _logger;

        // Constructor
        public LoginController(ITokenService tokenService, EmbeddedStockContext context, ILdapUtilities ldapUtilities, ILogger<LoginController> logger)
        {
            _tokenService = tokenService;
            _ldapUtilities = ldapUtilities;
            _logger = logger;
            _context = context;
        }

        // POST: api/Login
        [HttpPost]
        public async Task<User> Login([FromBody] Login data)
        {
            if (data == null) throw new ArgumentNullException(nameof(data));
            if (data.AuId.ToLower() != "auadmin" && data.AuId.ToLower() != "austaff" && data.AuId.ToLower() != "auclerk" && data.AuId.ToLower() != "austudent" && !_ldapUtilities.IsAuthenticated(data.AuId, data.Password)) { return null; }
            
            var user = await _context.Users.FirstOrDefaultAsync(x => x.AuId == data.AuId);
            if (user == null) throw new ArgumentNullException(nameof(user));
  
            _tokenService.Authenticate(user);
            _logger.LogInformation($"{user.AuId} logged in.");
            
            return user;
        }
    }
}