using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using VehicleServer.Entities;

namespace VehicleServer.Configuration
{
    public class StoreKeeperConfiguration : IEntityTypeConfiguration<StoreKeeper>
    {
        void IEntityTypeConfiguration<StoreKeeper>.Configure(EntityTypeBuilder<StoreKeeper> builder)
        {

            builder.HasKey(p => p.StoreKeeperId);
            builder.Property(p => p.Name).HasMaxLength(15).IsRequired();
            builder.HasOne(y => y.Store)
            .WithMany(y => y.StoreKeepers)
            .HasForeignKey(y => y.StoreId);
        }
    }
}

