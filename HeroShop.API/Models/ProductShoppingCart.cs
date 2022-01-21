namespace HeroShop.API.Models
{
    public class ProductShoppingCart
    {
        public int ProductsProductId { get; set; }
        public Product Product { get; set; }
        public int shoppingCartsShoppingCartId { get; set; }
        public ShoppingCart ShoppingCart { get; set; }
    }
}
