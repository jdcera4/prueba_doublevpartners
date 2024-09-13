using Microsoft.AspNetCore.Mvc;
using OnlineStoreApi.Data;
using OnlineStoreApi.Models;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace OnlineStoreApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CategoriesController : ControllerBase
    {
        private readonly IRepository<Category> _repository;

        public CategoriesController(IRepository<Category> repository)
        {
            _repository = repository;
        }

        [HttpGet]
        public async Task<IActionResult> GetCategories()
        {
            var categories = await _repository.GetAllAsync();
            return Ok(categories);
        }
}
}
