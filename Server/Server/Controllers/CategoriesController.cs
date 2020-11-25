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
    public class CategoriesController : ControllerBase
    {
        private readonly EmbeddedStockContext _context;
        private readonly ILogger<CategoriesController> _logger;

        // Constructor
        public CategoriesController(EmbeddedStockContext context, ILogger<CategoriesController> logger)
        {
            _context = context;
            _logger = logger;
        }

        // GET: api/Categories
        [HttpGet]
        public async Task<List<Category>> Get()
        {
            return await _context.Categories.ToListAsync();
        }

        // GET: api/Categories/5
        [HttpGet("{id}")]
        public async Task<List<Component>> Get(string id)
        {
            var category = await _context.Categories.FindAsync(id);
            if (category == null) throw new ArgumentNullException(nameof(category));
            
            return await _context.Components.Where(x => x.CategoryId == category.CategoryId).ToListAsync();
        }

        // POST: api/Categories
        [HttpPost]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> Post([FromBody] Category category)
        {
            if (category == null) throw new ArgumentNullException(nameof(category));
            var existing = await _context.Categories.FirstOrDefaultAsync(x => x.CategoryName == category.CategoryName);
            if (existing != null) { throw new Exception("Existing category"); }

            category.CategoryId = Guid.NewGuid().ToString();
            category.Components = new List<Component>();

            await _context.Categories.AddAsync(category);
            await _context.SaveChangesAsync();

            _logger.LogInformation($"{User.Identity.Name} created category: {category.CategoryName} - {category.CategoryId}");

            return Ok();
        }

        // PUT: api/Categories/5
        [HttpPut("{id}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> Put(string id, [FromBody] Category data)
        {
            if (data == null) throw new ArgumentNullException(nameof(data));
            
            var category = await _context.Categories.FindAsync(id);
            if (category == null) throw new ArgumentNullException(nameof(category));

            var components = await _context.Components.Where(x => x.CategoryId == category.CategoryId).ToListAsync();
            if (components == null) throw new ArgumentNullException(nameof(components));

            category.CategoryName = data.CategoryName;

            foreach (var component in components)
            {
                component.CategoryName = data.CategoryName;
                _context.Components.Update(component);
            }

            _context.Categories.Update(category);
            await _context.SaveChangesAsync();

            _logger.LogInformation($"{User.Identity.Name} updated category: {category.CategoryName} - {category.CategoryId}");

            return Ok();
        }

        // DELETE: api/Categories/5
        [HttpDelete("{id}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> Delete(string id)
        {
            var category = await _context.Categories.FindAsync(id);
            if (category == null) throw new ArgumentNullException(nameof(category));

            // TODO: Update existing components category

            _context.Categories.Remove(category);
            await _context.SaveChangesAsync();

            _logger.LogInformation($"{User.Identity.Name} deleted category: {category.CategoryName} - {category.CategoryId}");

            return Ok();
        }
    }
}