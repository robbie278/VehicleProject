using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System.Reflection.Emit;
using VehicleServer.Entities;

namespace VehicleServer.Configuration
{
    public class CategoryConfiguration : IEntityTypeConfiguration<Category>
    {
        public void Configure(EntityTypeBuilder<Category> builder)
        {
            builder.Property(p => p.Name).HasMaxLength(15).IsRequired();
            builder.HasKey(p => p.CategoryId);
            builder.Property(p => p.Description).HasMaxLength(200);
           


        }
    }
}
