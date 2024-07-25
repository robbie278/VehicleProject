using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using VehicleServer.Entities;

namespace VehicleServer.Configuration
{
    public class StoreConfiguration : IEntityTypeConfiguration<Store>
    {
        void IEntityTypeConfiguration<Store>.Configure(EntityTypeBuilder<Store> builder)
        {
            builder.Property(p => p.Name).HasMaxLength(15).IsRequired();
            builder.HasKey(p => p.StoreId);
        }
    }
}
