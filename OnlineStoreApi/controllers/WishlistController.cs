using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using OnlineStoreApi.Data;
using OnlineStoreApi.Models;

namespace OnlineStoreApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class WishlistController : ControllerBase
    {
        private readonly IRepository<WishlistItem> _repository;

        public WishlistController(IRepository<WishlistItem> repository)
        {
            _repository = repository;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<WishlistItem>>> GetWishlistItems()
        {
            var wishlistItems = await _repository.GetAllAsync();
            return Ok(wishlistItems);
        }

        [HttpPost]
        public async Task<IActionResult> AddToWishlist([FromBody] WishlistItem wishlistItem)
        {
            if (wishlistItem == null)
            {
                return BadRequest();
            }

            await _repository.AddAsync(wishlistItem);
            return CreatedAtAction(nameof(GetWishlistItems), new { id = wishlistItem.Id }, wishlistItem);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> RemoveFromWishlist(int id)
        {
            var item = await _repository.GetByIdAsync(id);

            if (item == null)
            {
                return NotFound();
            }

            await _repository.DeleteAsync(id);
            return NoContent();
        }
    }
}
