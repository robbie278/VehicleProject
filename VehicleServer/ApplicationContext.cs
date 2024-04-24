using Microsoft.EntityFrameworkCore;
using System.Reflection;
using VehicleServer.Entities;

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
        }

        public DbSet<Category> Categories { get; set; }
        public DbSet<ItemDto> Items { get; set; }
        public DbSet<Store> Stores { get; set; }
        public DbSet<StoreKeeper> StoreKeepers { get; set; }

    }
}
