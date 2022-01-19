using System.ComponentModel.DataAnnotations;

namespace HeroShop.API.Models
{
    public class User
    {
        [Key]
        public int UserId { get; set; }
        [Required]
        public bool Admin { get; set; }
        [Required]
        public string Username { get; set; }
        [Required]
        public string Password { get; set; }
        public virtual IEnumerable<ShoppingCart> ShoppingCarts { get; set; }
        public string? Name { get; set; }
        public string? Gender { get; set; }
        public string? Race { get; set; }

    }
}
