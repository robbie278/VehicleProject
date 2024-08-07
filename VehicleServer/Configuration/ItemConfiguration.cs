using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System.Reflection.Emit;
using VehicleServer.DTOs;
using VehicleServer.Entities;

namespace VehicleServer.Configuration
{
    public class ItemConfiguration : IEntityTypeConfiguration<Item>
    {
        public void Configure(EntityTypeBuilder<Item> builder)
        {
            builder.HasKey(p => p.ItemId);
            
            builder.HasOne(y => y.Category)
            .WithMany(y => y.Items)
            .HasForeignKey(y => y.CategoryId);

        }
       
    }
}
