using Microsoft.AspNetCore.Mvc;
using OnlineStoreApi.Data;
using OnlineStoreApi.Models;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace OnlineStoreApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ProductsController : ControllerBase
    {
        private readonly StoreDbContext _context;
        private readonly ILogger<ProductsController> _logger;

        public ProductsController(StoreDbContext context, ILogger<ProductsController> logger)
        {
            _context = context;
            _logger = logger;
        }

        // GET: api/products
        [HttpGet]
        public async Task<IActionResult> GetProducts(int pageNumber = 1, int pageSize = 10, string? search = null)
        {
            _logger.LogInformation("Fetching products with pagination. Page: {PageNumber}, PageSize: {PageSize}", pageNumber, pageSize);

            var query = _context.Products.AsQueryable();

            // Implementing search functionality if a search term is provided
            if (!string.IsNullOrEmpty(search))
            {
                query = query.Where(p => p.Name.Contains(search));
            }

            var totalItems = await query.CountAsync();
            var products = await query
                .Skip((pageNumber - 1) * pageSize)
                .Take(pageSize)
                .ToListAsync();

            var result = new
            {
                TotalItems = totalItems,
                PageNumber = pageNumber,
                PageSize = pageSize,
                Products = products
            };

            return Ok(result);
        }

        // GET: api/products/{id}
        [HttpGet("{id}")]
        public async Task<IActionResult> GetProduct(int id)
        {
            var product = await _context.Products.FindAsync(id);
            if (product == null)
            {
                return NotFound();
            }
            return Ok(product);
        }
    }
}
