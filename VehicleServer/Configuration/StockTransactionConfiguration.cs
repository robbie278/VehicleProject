﻿using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Microsoft.EntityFrameworkCore;
using VehicleServer.Entities;
using Humanizer;

namespace VehicleServer.Configuration
{
    public class StockTransactionConfiguration : IEntityTypeConfiguration<StockTransaction>
    {
        void IEntityTypeConfiguration<StockTransaction>.Configure(EntityTypeBuilder<StockTransaction> builder)
        {
           
            builder.HasKey(p => p.TransactionId);

            builder.HasOne(y => y.User)
            .WithMany(y => y.StockTransactions)
            .HasForeignKey(y => y.UserId);

            builder.HasOne(y => y.Stores)
           .WithMany(y => y.StocksTransactions)
           .HasForeignKey(y => y.StoreId)
           .OnDelete(DeleteBehavior.NoAction);

            builder.HasOne(y => y.StoreKeeper)
           .WithMany(y => y.StockTransactions)
           .HasForeignKey(y => y.StoreKeeperId)
           .OnDelete(DeleteBehavior.NoAction);

            builder.HasOne(y => y.Items)
         .WithMany(y => y.StockTransactions)
         .HasForeignKey(y => y.ItemId)
         .OnDelete(DeleteBehavior.NoAction);
        }
    }
}
