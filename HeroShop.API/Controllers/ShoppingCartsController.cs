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

        // PATCH: api/Users/4/ShoppingCart/5
        [HttpPatch("{cartId}")]
        public async Task<IActionResult> PatchShoppingCart(int cartId, int userId, int productId)
        {
            if (!UserExists(userId))
            {
                return NotFound();
            }

            if (!ShoppingCartExists(cartId))
            {
                return NotFound();
            }

            if (!ProductExists(productId))
            {
                return NotFound();
            }

            ShoppingCart newShoppingCart = _context.ShoppingCarts.Find(cartId);
            Product product = _context.Products.Find(productId);
            newShoppingCart.Products.Add(product);

            _context.Entry(newShoppingCart).State = EntityState.Modified;

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
            return CreatedAtAction("GetShoppingCart", new { cartId = shoppingCart.ShoppingCartId, userId = userId }, shoppingCart);
        }

        // POST: api/Users/4/ShoppingCart/Products
        [HttpPost("Products")]
        public async Task<ActionResult<ShoppingCart>> PostShoppingCartProduct(int cartId, int userId, int productId)
        {
            if (!UserExists(userId))
            {
                return NotFound();
            }

            if (!ShoppingCartExists(cartId))
            {
                return NotFound();
            }

            if (!ProductExists(productId))
            {
                return NotFound();
            }

            ProductShoppingCart productShoppingCart = new ProductShoppingCart() { ProductsProductId = productId, shoppingCartsShoppingCartId = cartId };

            _context.ProductShoppingCarts.Add(productShoppingCart);

            await _context.SaveChangesAsync();

            return NoContent();
        }

        // DELETE: api/Users/4/ShoppingCart/Products
        [HttpDelete("Products/{productId}")]
        public async Task<ActionResult<ShoppingCart>> DeleteShoppingCartProduct(int cartId, int userId, int productId)
        {
            if (!UserExists(userId))
            {
                return NotFound();
            }

            if (!ShoppingCartExists(cartId))
            {
                return NotFound();
            }

            if (!ProductExists(productId))
            {
                return NotFound();
            }

            ProductShoppingCart productShoppingCart = new ProductShoppingCart() { ProductsProductId = productId, shoppingCartsShoppingCartId = cartId };

            _context.ProductShoppingCarts.Remove(productShoppingCart);

            await _context.SaveChangesAsync();

            return NoContent();
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

        private bool ProductExists(int id)
        {
            return _context.Products.Any(e => e.ProductId == id);
        }

        private ShoppingCart ActiveShoppingCart(int userId)
        {
            List<ShoppingCart> userShoppingCarts = _context.ShoppingCarts.Where(cart => cart.UserId == userId).Include(x => x.Products).ToList();

            int activeShoppingCartId = userShoppingCarts.Max(cart => cart.ShoppingCartId);

            ShoppingCart activeShoppingCart = userShoppingCarts.Where(cart => cart.ShoppingCartId == activeShoppingCartId).FirstOrDefault();

            return activeShoppingCart;
        }
    }
}
