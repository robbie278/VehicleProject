using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System.Reflection.Emit;
using VehicleServer.Entities;

namespace VehicleServer.Configuration
{
    public class ItemConfiguration : IEntityTypeConfiguration<Item>
    {
        void IEntityTypeConfiguration<Item>.Configure(EntityTypeBuilder<Item> builder)
        {
            builder.HasKey(p => p.ItemId);
            builder.Property(p => p.Name).HasMaxLength(15).IsRequired();
            builder.Property(p => p.Description).HasMaxLength(200);
            builder.HasOne(y => y.Category)
            .WithMany(y => y.Items)
            .HasForeignKey(y => y.CategoryId);
        }
    }
}
