using System.ComponentModel.DataAnnotations;

namespace HeroShop.API.Models
{
    public class ShoppingCart
    {
        [Key]
        public int ShoppingCartId { get; set; }
        [Required]
        public int Total { get; set; }
        public DateTime? TimeBought { get; set; }
        public List<Product>? Products { get; set; }
        public int UserId { get; set; }
    }

}
