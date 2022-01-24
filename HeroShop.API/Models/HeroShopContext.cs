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
        public DbSet<ProductShoppingCart> ProductShoppingCarts { get; set; }

        //protected override void OnModelCreating(ModelBuilder modelBuilder)
        //{
        //    modelBuilder.Entity<ShoppingCart>()
        //        .HasMany(s => s.Products)
        //        .WithMany(p => p.shoppingCarts)
        //        .UsingEntity<ProductShoppingCart>(
        //        pg => pg.HasOne(x => x.Product).WithMany().HasForeignKey(fk => fk.ProductsProductId),
        //        pg => pg.HasOne(x => x.ShoppingCart).WithMany().HasForeignKey(fk => fk.shoppingCartsShoppingCartId),
        //        pg => pg.HasKey(x => new { x.ProductsProductId, x.shoppingCartsShoppingCartId })
        //        );

        //}
    }
}