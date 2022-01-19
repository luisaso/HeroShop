using Microsoft.EntityFrameworkCore;

namespace HeroShop.API.Models
{
    public class HeroShopContext : DbContext
    {
        public HeroShopContext(DbContextOptions<HeroShopContext> options) : base(options)
        {

        }

        public DbSet<User> Users { get; set; }
        public DbSet<Product> Products { get; set; }
        public DbSet<ShoppingCart> ShoppingCarts { get; set; }


    }
}
