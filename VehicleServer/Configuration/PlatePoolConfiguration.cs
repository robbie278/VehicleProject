using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Microsoft.EntityFrameworkCore;
using VehicleServer.Entities;

namespace VehicleServer.Configuration
{
    public class PlatePoolConfiguration
    {
      
            public void Configure(EntityTypeBuilder<PlatePool> builder)
            {
                builder.HasKey(p => p.PlatePoolId);
                builder.Property(p => p.PlateNumber).IsRequired().HasMaxLength(20);
                builder.Property(p => p.CreatedByUsername).HasMaxLength(20);
                builder.Property(p => p.LastModifiedByUsername).HasMaxLength(50);
                builder.Property(p => p.DeletedByUsername).HasMaxLength(50);

                // Additional configurations as needed
            }
    }
}
