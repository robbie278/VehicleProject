using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Microsoft.EntityFrameworkCore;
using VehicleServer.Entities;

namespace VehicleServer.Configuration
{
    public class StockConfiguratiton : IEntityTypeConfiguration<Stock>
    {
        void IEntityTypeConfiguration<Stock>.Configure(EntityTypeBuilder<Stock> builder)
        {
            builder.HasKey(p => p.StockId);


            builder.HasOne(y => y.Items)
            .WithMany(y => y.Stock)
            .HasForeignKey(y => y.ItemId)
            .OnDelete(DeleteBehavior.Restrict);

            builder.HasOne(y => y.Stores)
          .WithMany(y => y.Stock)
          .HasForeignKey(y => y.StoreId)
          .OnDelete(DeleteBehavior.Restrict);

        }
    }
}
