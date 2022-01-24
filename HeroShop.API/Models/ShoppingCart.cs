using System.ComponentModel.DataAnnotations;

namespace HeroShop.API.Models
{
    public class ShoppingCart
    {
        [Key]
        public int ShoppingCartId { get; set; }
        [Required]
        public int Total { get; set; }
        [Required]
        public int UserId { get; set; }
        public DateTime? OrderPlaced { get; set; }
        public List<ProductShoppingCart>? ProductsShoppingCart { get; set; }

    }

}
