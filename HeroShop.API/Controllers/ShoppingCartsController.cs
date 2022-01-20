#nullable disable
using HeroShop.API.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace HeroShop.API.Controllers
{
    [Route("api/Users/{userId}/ShoppingCart")]
    [ApiController]
    public class ShoppingCartsController : ControllerBase
    {
        private readonly HeroShopContext _context;

        public ShoppingCartsController(HeroShopContext context)
        {
            _context = context;
        }

        // GET: api/Users/4/ShoppingCart
        [HttpGet]
        public async Task<ActionResult<ShoppingCart>> GetShoppingCarts(int userId)
        {
            if (!UserExists(userId))
            {
                return NotFound();
            }

            return ActiveShoppingCart(userId);
        }

        // GET: api/Users/4/ShoppingCart/5
        [HttpGet("{cartId}")]
        public async Task<ActionResult<ShoppingCart>> GetShoppingCart(int cartId, int userId)
        {
            if (!UserExists(userId))
            {
                return NotFound();
            }

            var shoppingCart = await _context.ShoppingCarts.FindAsync(cartId);

            if (shoppingCart == null)
            {
                return NotFound();
            }

            return shoppingCart;
        }

        // PUT: api/Users/4/ShoppingCart/5
        [HttpPut("{cartId}")]
        public async Task<IActionResult> PutShoppingCart(int cartId, ShoppingCart shoppingCart, int userId)
        {
            if (cartId != shoppingCart.ShoppingCartId)
            {
                return BadRequest();
            }

            _context.Entry(shoppingCart).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ShoppingCartExists(cartId))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Users/4/ShoppingCart
        [HttpPost]
        public async Task<ActionResult<ShoppingCart>> PostShoppingCart(ShoppingCart shoppingCart, int userId)
        {
            if (!UserExists(userId))
            {
                return NotFound();
            }

            _context.ShoppingCarts.Add(shoppingCart);
            await _context.SaveChangesAsync();
            return CreatedAtAction("GetShoppingCart", new { id = shoppingCart.ShoppingCartId, userId }, shoppingCart);
        }

        // DELETE: api/Users/4/ShoppingCart/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteShoppingCart(int cartId, int userId)
        {
            var shoppingCart = await _context.ShoppingCarts.FindAsync(cartId);
            if (shoppingCart == null)
            {
                return NotFound();
            }
            if (!UserExists(userId))
            {
                return NotFound();
            }

            _context.ShoppingCarts.Remove(shoppingCart);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool ShoppingCartExists(int id)
        {
            return _context.ShoppingCarts.Any(e => e.ShoppingCartId == id);
        }

        private bool UserExists(int id)
        {
            return _context.Users.Any(e => e.UserId == id);
        }

        private ShoppingCart ActiveShoppingCart(int userId)
        {
            List<ShoppingCart> userShoppingCarts = _context.ShoppingCarts.Where(cart => cart.UserId == userId).ToList();

            int activeShoppingCartId = userShoppingCarts.Max(cart => cart.ShoppingCartId);

            ShoppingCart activeShoppingCart = userShoppingCarts.Where(cart => cart.ShoppingCartId == activeShoppingCartId).FirstOrDefault();

            return activeShoppingCart;
        }
    }
}
