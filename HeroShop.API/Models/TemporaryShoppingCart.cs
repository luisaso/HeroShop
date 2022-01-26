namespace HeroShop.API.Models
{
    public class TemporaryShoppingCart
    {
        public int UserId { get; set; }
        public List<ProductShoppingCart>? ProductsShoppingCart { get; set; }
    }
}
