using System.ComponentModel.DataAnnotations;

namespace HeroShop.API.Models
{
    public class ProductShoppingCart
    {
        [Key]
        public int Id { get; set; }
        [Required]
        public Product Product { get; set; }
        [Required]
        public int Amount { get; set; }
        [Required]
        public int ShoppingCartId { get; set; }
    }
}
