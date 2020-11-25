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
    [Authorize]
    public class ComponentsController : ControllerBase
    {
        private readonly EmbeddedStockContext _context;
        private readonly ILogger<ComponentsController> _logger;

        //Constructor
        public ComponentsController(EmbeddedStockContext context, ILogger<ComponentsController> logger)
        {
            _context = context;
            _logger = logger;
        }

        // GET: api/Components/5
        [HttpGet("{id}")]
        public async Task<Component> Get(string id)
        {
            return await _context.Components.FindAsync(id);
        }

        // GET: api/Components
        [HttpGet]
        public async Task<List<Component>> Get()
        {
            return await _context.Components.ToListAsync();
        }

        // POST: api/Components
        [HttpPost]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> Post([FromBody] Component component)
        {
            if (component == null) throw new ArgumentNullException(nameof(component));

            var category = await _context.Categories.FindAsync(component.CategoryId);

            component.ComponentId = Guid.NewGuid().ToString();
            component.CategoryId = component.CategoryId;
            component.CategoryName = category.CategoryName;
            component.History = new History { HistoryId = Guid.NewGuid().ToString(), ComponentId = component.ComponentId };
            if (component.Count == 0) { component.Count = 1; }

            await _context.Components.AddAsync(component);
            await _context.SaveChangesAsync();

            _logger.LogInformation($"{User.Identity.Name} created: {component.ComponentName} - {component.ComponentId}");

            return Ok();
        }

        // PUT: api/Components/5
        [HttpPut("{id}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> Put(string id, [FromBody] Component component)
        {
            if (component == null) throw new ArgumentNullException(nameof(component));
            var data = await _context.Components.FindAsync(id);
            if (data == null) throw new ArgumentNullException(nameof(data));

            var category = await _context.Categories.FirstOrDefaultAsync(x => x.CategoryName == component.CategoryName);

            data.ComponentName = component.ComponentName;
            data.CategoryId = category.CategoryId;
            data.CategoryName = category.CategoryName;
            data.ComponentInfo = component.ComponentInfo;
            data.ComponentLocation = component.ComponentLocation;
            data.ComponentStatus = component.ComponentStatus;
            data.ComponentNumber = component.ComponentNumber;
            data.Count = component.Count;
            data.AdminComment = component.AdminComment;
            data.ImageUrl = component.ImageUrl;
            data.Manufacturer = component.Manufacturer;
            data.Datasheet = component.Datasheet;
            data.SerialNumber = component.SerialNumber;
            data.WikiLink = component.WikiLink;

            _context.Components.Update(data);
            await _context.SaveChangesAsync();

            _logger.LogInformation($"{User.Identity.Name} updated: {data.ComponentName} - {data.ComponentId}");

            return Ok();
        }

        // DELETE: api/Components/5
        [HttpDelete("{id}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> Delete(string id)
        {
            var component = await _context.Components.FindAsync(id);
            if (component == null) throw new ArgumentNullException(nameof(component));
            var history = await _context.Histories.FirstOrDefaultAsync(x => x.ComponentId == component.ComponentId);
            if (history == null) throw new ArgumentNullException(nameof(history));

            var reservations = await _context.Reservations.Where(x => x.ComponentId == component.ComponentId).ToListAsync();
            var loans = await _context.Loans.Where(x => x.ComponentId == component.ComponentId).ToListAsync();

            if (reservations != null)
            {
                foreach (var reservation in reservations)
                {
                    _context.Reservations.Remove(reservation);
                }
            }
            if (loans != null)
            {
                foreach (var loan in loans)
                {
                    _context.Loans.Remove(loan);
                }
            }

            _context.Histories.Remove(history);
            _context.Components.Remove(component);
            await _context.SaveChangesAsync();

            _logger.LogInformation($"{User.Identity.Name} deleted: {component.ComponentName} - {component.ComponentId}");

            return Ok();
        }
    }
}