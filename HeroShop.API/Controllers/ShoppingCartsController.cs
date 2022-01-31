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

        /*--------GET--------------------*/

        [HttpGet("{cartId}")]
        public async Task<ActionResult<ShoppingCart>> GetShoppingCart(int userId, int cartId)
        {
            if (!UserExists(userId))
            {
                return NotFound();
            }

            if (!ShoppingCartExists(cartId))
            {
                return NotFound();
            }

            ShoppingCart cart = _context.ShoppingCarts.Where(sc => sc.ShoppingCartId == cartId).FirstOrDefault();

            return Ok(cart);
        }

        // GET: api/Users/4/ShoppingCart
        [HttpGet]
        public async Task<ActionResult<ShoppingCart>> GetActiveShoppingCart(int userId)
        {
            if (!UserExists(userId))
            {
                return NotFound();
            }

            return Ok(ActiveShoppingCart(userId));
        }

        // GET: api/Users/4/ShoppingCart/Products
        [HttpGet("Products")]
        public async Task<ActionResult<List<Product>>> GetProductsInShoppingCart(int userId)
        {
            if (!UserExists(userId))
            {
                return NotFound();
            }

            ShoppingCart activeCart = ActiveShoppingCart(userId);

            List<Product> shoppingCartProducts = _context.ProductShoppingCarts.Where(psc => psc.ShoppingCartId == activeCart.ShoppingCartId).Select(x => x.Product).ToList();

            //var a = JsonSerializer.Serialize(shoppingCartProducts);

            return Ok(shoppingCartProducts);
        }

        // GET: api/Users/4/ShoppingCart/Products/3
        [HttpGet("Products/{productId}")]
        public async Task<ActionResult<Product>> GetProductInShoppingCart(int userId, int productId)
        {
            if (!UserExists(userId))
            {
                return NotFound();
            }

            ShoppingCart activeCart = ActiveShoppingCart(userId);

            if (!ProductExists(productId))
            {
                return NotFound();
            }

            Product shoppingCartProducts = _context.ProductShoppingCarts.Where(psc => psc.ShoppingCartId == activeCart.ShoppingCartId).Select(x => x.Product).Where(p => p.ProductId == productId).FirstOrDefault();

            return Ok(shoppingCartProducts);
        }

        /*--------POST--------------------*/
        // Erro quando faço um post com produtos dentro. Sem produtos é tranquilo
        // O post do ProductShoppingCart não pode ter o id.
        // POST: api/Users/4/ShoppingCart
        [HttpPost]
        public async Task<ActionResult<ShoppingCart>> PostShoppingCart(TemporaryShoppingCart temporaryShoppingCart)
        {
            if (!UserExists(temporaryShoppingCart.UserId))
            {
                return NotFound();
            }

            foreach (ProductShoppingCart product in temporaryShoppingCart.ProductsShoppingCart)
            {
                _context.Entry(product.Product).State = EntityState.Unchanged;
                _context.Entry(product).State = EntityState.Detached;
            }

            ShoppingCart shoppingCart = new ShoppingCart() { UserId = temporaryShoppingCart.UserId, ProductsShoppingCart = temporaryShoppingCart.ProductsShoppingCart };

            shoppingCart.Total = CalculateTotal(temporaryShoppingCart.ProductsShoppingCart);
            shoppingCart.OrderPlaced = DateTime.Now;

            _context.ShoppingCarts.Add(shoppingCart);
            await _context.SaveChangesAsync();
            return CreatedAtAction("GetShoppingCart", new { cartId = shoppingCart.ShoppingCartId, userId = shoppingCart.UserId }, shoppingCart);
        }

        //// POST: api/Users/4/ShoppingCart/Products
        //[HttpPost("Products")]
        //public async Task<ActionResult<ShoppingCart>> PostShoppingCartProduct(int userId, int productId, int amount)
        //{
        //    if (!UserExists(userId))
        //    {
        //        return NotFound();
        //    }

        //    if (!ProductExists(productId))
        //    {
        //        return NotFound();
        //    }

        //    ShoppingCart activeCart = ActiveShoppingCart(userId);

        //    Product product = _context.Products.Where(p => p.ProductId == productId).FirstOrDefault();

        //    ProductShoppingCart productShoppingCart = new ProductShoppingCart() { Product = product, ShoppingCartId = activeCart.ShoppingCartId, Amount = amount };

        //    _context.ProductShoppingCarts.Add(productShoppingCart);

        //    activeCart.Total += amount * product.Price;

        //    await _context.SaveChangesAsync();

        //    return CreatedAtAction("GetProduct", "ProductsController", new { id = productId }, product);
        //}

        /*--------PATCH--------------------*/

        // PATCH: api/Users/4/ShoppingCart
        [HttpPatch]
        public async Task<IActionResult> PatchShoppingCart(int userId)
        {
            if (!UserExists(userId))
            {
                return NotFound();
            }


            ShoppingCart activeCart = ActiveShoppingCart(userId);

            activeCart.OrderPlaced = DateTime.Now;

            _context.Entry(activeCart).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ShoppingCartExists(activeCart.ShoppingCartId))
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

        // PATCH: api/Users/4/ShoppingCart/Products
        [HttpPatch("Products")]
        public async Task<IActionResult> PatchProductInShoppingCart(int userId, int productId, int amount)
        {
            if (!UserExists(userId))
            {
                return NotFound();
            }

            if (!ProductExists(productId))
            {
                return NotFound();
            }

            ShoppingCart activeCart = ActiveShoppingCart(userId);

            ProductShoppingCart productInShopCart = _context.ProductShoppingCarts.Where(x => x.ShoppingCartId == activeCart.ShoppingCartId).ToList().Find(x => x.Product.ProductId == productId);

            if (productInShopCart == null)
            {
                Product product = _context.Products.Where(p => p.ProductId == productId).FirstOrDefault();

                ProductShoppingCart productShoppingCart = new ProductShoppingCart() { Product = product, ShoppingCartId = activeCart.ShoppingCartId, Amount = amount };

                _context.ProductShoppingCarts.Add(productShoppingCart);

                activeCart.Total += amount * product.Price;

                await _context.SaveChangesAsync();

                return CreatedAtAction("GetProduct", "Products", new { id = productId }, product);

            }
            else
            {
                Product product = _context.Products.Where(product => product.ProductId == productId).FirstOrDefault();

                int newPrice = product.Price * amount;

                productInShopCart.Amount += amount;
                activeCart.Total += newPrice;

                _context.Entry(activeCart).State = EntityState.Modified;
                _context.Entry(productInShopCart).State = EntityState.Modified;

                try
                {
                    await _context.SaveChangesAsync();
                }
                catch (DbUpdateConcurrencyException)
                {
                    if (!ShoppingCartExists(activeCart.ShoppingCartId))
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

        }

        /*-------------DELETE--------------------------*/

        // DELETE: api/Users/4/ShoppingCart/Products/3
        [HttpDelete("Products/{productId}")]
        public async Task<ActionResult<ShoppingCart>> DeleteShoppingCartProduct(int userId, int productId)
        {
            if (!UserExists(userId))
            {
                return NotFound();
            }

            if (!ProductExists(productId))
            {
                return NotFound();
            }

            ShoppingCart activeCart = ActiveShoppingCart(userId);

            ProductShoppingCart productInShopCart = _context.ProductShoppingCarts.Where(x => x.ShoppingCartId == activeCart.ShoppingCartId).ToList().Find(x => x.Product.ProductId == productId);

            activeCart.Total -= productInShopCart.Amount * productInShopCart.Product.Price;

            _context.ProductShoppingCarts.Remove(productInShopCart);

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
            List<ShoppingCart> userShoppingCarts = _context.ShoppingCarts.Where(cart => cart.UserId == userId).Include(x => x.ProductsShoppingCart).ThenInclude(p => p.Product).ToList();

            int activeShoppingCartId = userShoppingCarts.Max(cart => cart.ShoppingCartId);

            ShoppingCart activeShoppingCart = userShoppingCarts.Where(cart => cart.ShoppingCartId == activeShoppingCartId).FirstOrDefault();

            return activeShoppingCart;
        }

        private int CalculateTotal(List<ProductShoppingCart> products)
        {
            int total = 0;

            foreach (var product in products)
            {
                total += product.Amount * product.Product.Price;
            }
            return total;
        }
    }
}
