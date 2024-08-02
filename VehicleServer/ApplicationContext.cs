using Microsoft.EntityFrameworkCore;
using System.Reflection;
using VehicleServer.DTOs;
using VehicleServer.Entities;
//using VehicleServer.Seeding;

namespace VehicleServer
{
    public class ApplicationContext : DbContext
    {
        public ApplicationContext(DbContextOptions options) : base(options)
        {
        }
        
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            modelBuilder.ApplyConfigurationsFromAssembly(Assembly.GetExecutingAssembly());

            //Module3Sedding.Seed(modelBuilder);

        }

        public DbSet<Category> Categories { get; set; }
        public DbSet<Item> Items { get; set; }
        public DbSet<Store> Stores { get; set; }
        public DbSet<StoreKeeper> StoreKeepers { get; set; }
        public DbSet<Stock> Stocks { get; set; }
        public DbSet<StockTransaction> StockTransactions { get; set; }
        public DbSet<User> Users { get; set; }
        public DbSet<StockItemsDetail> StockItemsDetail { get; set;}

        // plate pool table
        public DbSet<PlatePool> PlatePool { get; set; }


    }
}
