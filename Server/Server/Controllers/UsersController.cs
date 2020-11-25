using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Server.Data;
using Server.Models;
using System;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using Serilog;

namespace Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class UsersController : ControllerBase
    {
        private readonly EmbeddedStockContext _context;
        private readonly ILogger<UsersController> _logger;

        public UsersController(EmbeddedStockContext context, ILogger<UsersController> logger)
        {
            _context = context;
            _logger = logger;
        }

        // GET: api/Users
        [HttpGet]
        public async Task<User> Get()
        {
            return await _context.Users.FindAsync(User.Identity.Name);
        }

        // GET: api/Users/5
        [HttpGet("{id}")]
        [Authorize(Roles = "Admin, Clerk")]
        public async Task<User> Get(string id)
        {
            if (id.ToLower().StartsWith('a'))
            {
                return await _context.Users.FirstOrDefaultAsync(x => x.AuId == id);
            }

            return await _context.Users.FirstOrDefaultAsync(x => x.StudentNumber.ToString() == id);
        }

        // PUT: api/Users
        [HttpPut]
        public async Task<IActionResult> Put([FromBody] User data)
        {
            if (data == null) throw new ArgumentNullException(nameof(data));
            var user = await _context.Users.FindAsync(User.Identity.Name);
            if (user == null) throw new ArgumentNullException(nameof(user));

            user.FirstName = data.FirstName;
            user.LastName = data.LastName;
            user.Email = data.Email;
            user.PhoneNumber = data.PhoneNumber;
            user.StudentNumber = data.StudentNumber;

            _context.Users.Update(user);
            await _context.SaveChangesAsync();

            _logger.LogInformation($"{User.Identity.Name} updated their profile: {data.AuId} - {data.Id}");

            return Ok();
        }

        // DELETE: api/Users
        [HttpDelete]
        public async Task<IActionResult> Delete()
        {
            var user = await _context.Users.FindAsync(User.Identity.Name);
            if (user == null) throw new ArgumentNullException(nameof(user));
            var loans = await _context.Loans.SingleOrDefaultAsync(x => x.UserId == user.Id);
            if (loans != null) { return BadRequest("Return borrowed items before deleting your account.") ;}
            
            _context.Users.Remove(user);
            await _context.SaveChangesAsync();

            _logger.LogInformation($"{User.Identity.Name} deleted their profile: {user.AuId} - {user.Id}");

            return Ok();
        }
    }
}