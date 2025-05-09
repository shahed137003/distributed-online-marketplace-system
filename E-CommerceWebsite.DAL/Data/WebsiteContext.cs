using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using E_CommerceWebsite.DAL.Data.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using System.Net;

namespace E_CommerceWebsite.DAL.Data
{
    public class WebsiteContext : IdentityDbContext<ApplicationUser>
    {

        public WebsiteContext(DbContextOptions<WebsiteContext> options) : base(options)
        {
           

        }

        protected override void OnModelCreating(ModelBuilder builder)
        {
               //builder.Entity<Order>()
               // .HasOne(o => o.Payment)
               // .WithOne(p => p.Order)
               // .HasForeignKey<Payment>(p => p.OrderId);


                builder.Entity<ShoppingCart>()
             .HasOne(o => o.User)
             .WithOne(p => p.ShoppingCart)
             .HasForeignKey<ShoppingCart>(p => p.UserId);


            builder.Entity<ApplicationUser>()
         .HasOne(o => o.Inventory)
         .WithOne(p => p.ApplicationUser)
         .HasForeignKey<Inventory>(p => p.UserId);


            builder.Entity<CartItem>()
                .HasKey(ci => new { ci.CartId, ci.ProductId });

            builder.Entity<CartItem>()
              .HasOne(ci => ci.Cart)
              .WithMany(sc => sc.CartItems)
              .HasForeignKey(ci => ci.CartId);

            builder.Entity<CartItem>()
                .HasOne(ci => ci.Product)
                .WithMany(p => p.CartItems)
                .HasForeignKey(ci => ci.ProductId);

            //builder.Entity<Address>()
            //    .HasOne(ci => ci.User)
            //    .WithOne()
            //    .HasForeignKey<Address>(ci => ci.UserID);

            base.OnModelCreating(builder);
        }

        //public DbSet<Order> Orders { get; set; }
        //public DbSet<Payment> Payments { get; set; }
        public DbSet<Product> products { get; set; }

        public DbSet<Category> Categories { get; set; }
        public DbSet<ApplicationUser> users { get; set; }
        public DbSet<ShoppingCart> ShoppingCart { get; set; }
        public DbSet<CartItem> CartItems { get; set; }
        public DbSet<Inventory> Inventories { get; set; }
    }
}
