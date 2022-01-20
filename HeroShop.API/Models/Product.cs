using System.ComponentModel.DataAnnotations;

namespace HeroShop.API.Models
{
    public class Product
    {
        [Key]
        public int ProductId { get; set; }
        [Required]
        public string Name { get; set; }
        [Required]
        public string Type { get; set; }
        [Required]
        public string Rarity { get; set; }
        [Required]
        public int Price { get; set; }
        [Required]
        public string Description { get; set; }
        [Required]
        public string ImgLink { get; set; }
        public List<ShoppingCart>? shoppingCarts { get; set; }
    }
}
