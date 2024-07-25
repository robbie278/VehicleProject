﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using VehicleServer;

#nullable disable

namespace VehicleServer.Migrations
{
    [DbContext(typeof(ApplicationContext))]
    [Migration("20240603151748_init")]
    partial class init
    {
        /// <inheritdoc />
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "7.0.0")
                .HasAnnotation("Relational:MaxIdentifierLength", 128);

            SqlServerModelBuilderExtensions.UseIdentityColumns(modelBuilder);

            modelBuilder.Entity("VehicleServer.Entities.Category", b =>
                {
                    b.Property<int>("CategoryId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("CategoryId"));

                    b.Property<string>("Description")
                        .HasMaxLength(200)
                        .HasColumnType("nvarchar(200)");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasMaxLength(15)
                        .HasColumnType("nvarchar(15)");

                    b.HasKey("CategoryId");

                    b.ToTable("Categories");
                });

            modelBuilder.Entity("VehicleServer.Entities.Item", b =>
                {
                    b.Property<int>("ItemId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("ItemId"));

                    b.Property<int>("CategoryId")
                        .HasColumnType("int");

                    b.Property<string>("Description")
                        .HasMaxLength(200)
                        .HasColumnType("nvarchar(200)");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasMaxLength(15)
                        .HasColumnType("nvarchar(15)");

                    b.HasKey("ItemId");

                    b.HasIndex("CategoryId");

                    b.ToTable("Items");
                });

            modelBuilder.Entity("VehicleServer.Entities.Stock", b =>
                {
                    b.Property<int>("StockId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("StockId"));

                    b.Property<int>("ItemId")
                        .HasColumnType("int");

                    b.Property<DateTime>("LastUpdatedDate")
                        .HasColumnType("datetime2");

                    b.Property<int>("QuantityInStock")
                        .HasColumnType("int");

                    b.Property<int>("StoreId")
                        .HasColumnType("int");

                    b.HasKey("StockId");

                    b.HasIndex("ItemId");

                    b.HasIndex("StoreId");

                    b.ToTable("Stocks");
                });

            modelBuilder.Entity("VehicleServer.Entities.StockTransaction", b =>
                {
                    b.Property<int>("TransactionId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("TransactionId"));

                    b.Property<int>("ItemId")
                        .HasColumnType("int");

                    b.Property<int?>("PadNumberEnd")
                        .HasColumnType("int");

                    b.Property<int>("PadNumberStart")
                        .HasColumnType("int");

                    b.Property<int>("Quantity")
                        .HasColumnType("int");

                    b.Property<int>("StoreId")
                        .HasColumnType("int");

                    b.Property<int>("StoreKeeperId")
                        .HasColumnType("int");

                    b.Property<DateTime>("TransactionDate")
                        .HasColumnType("datetime2");

                    b.Property<string>("TransactionType")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<int?>("UserId")
                        .HasColumnType("int");

                    b.HasKey("TransactionId");

                    b.HasIndex("ItemId");

                    b.HasIndex("StoreId");

                    b.HasIndex("StoreKeeperId");

                    b.HasIndex("UserId");

                    b.ToTable("StockTransactions");
                });

            modelBuilder.Entity("VehicleServer.Entities.Store", b =>
                {
                    b.Property<int>("StoreId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("StoreId"));

                    b.Property<string>("Address")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasMaxLength(15)
                        .HasColumnType("nvarchar(15)");

                    b.HasKey("StoreId");

                    b.ToTable("Stores");
                });

            modelBuilder.Entity("VehicleServer.Entities.StoreKeeper", b =>
                {
                    b.Property<int>("StoreKeeperId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("StoreKeeperId"));

                    b.Property<string>("Email")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasMaxLength(15)
                        .HasColumnType("nvarchar(15)");

                    b.Property<int>("StoreId")
                        .HasColumnType("int");

                    b.HasKey("StoreKeeperId");

                    b.HasIndex("StoreId");

                    b.ToTable("StoreKeepers");
                });

            modelBuilder.Entity("VehicleServer.Entities.User", b =>
                {
                    b.Property<int>("UserId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("UserId"));

                    b.Property<string>("UserEmail")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("UserName")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("UserRole")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("UserId");

                    b.ToTable("Users");
                });

            modelBuilder.Entity("VehicleServer.Entities.Item", b =>
                {
                    b.HasOne("VehicleServer.Entities.Category", "Category")
                        .WithMany("Items")
                        .HasForeignKey("CategoryId")
                        .OnDelete(DeleteBehavior.Restrict)
                        .IsRequired();

                    b.Navigation("Category");
                });

            modelBuilder.Entity("VehicleServer.Entities.Stock", b =>
                {
                    b.HasOne("VehicleServer.Entities.Item", "Items")
                        .WithMany("Stock")
                        .HasForeignKey("ItemId")
                        .OnDelete(DeleteBehavior.Restrict)
                        .IsRequired();

                    b.HasOne("VehicleServer.Entities.Store", "Stores")
                        .WithMany("Stock")
                        .HasForeignKey("StoreId")
                        .OnDelete(DeleteBehavior.Restrict)
                        .IsRequired();

                    b.Navigation("Items");

                    b.Navigation("Stores");
                });

            modelBuilder.Entity("VehicleServer.Entities.StockTransaction", b =>
                {
                    b.HasOne("VehicleServer.Entities.Item", "Items")
                        .WithMany("StockTransactions")
                        .HasForeignKey("ItemId")
                        .OnDelete(DeleteBehavior.Restrict)
                        .IsRequired();

                    b.HasOne("VehicleServer.Entities.Store", "Stores")
                        .WithMany("StocksTransactions")
                        .HasForeignKey("StoreId")
                        .OnDelete(DeleteBehavior.Restrict)
                        .IsRequired();

                    b.HasOne("VehicleServer.Entities.StoreKeeper", "StoreKeeper")
                        .WithMany("StockTransactions")
                        .HasForeignKey("StoreKeeperId")
                        .OnDelete(DeleteBehavior.Restrict)
                        .IsRequired();

                    b.HasOne("VehicleServer.Entities.User", "User")
                        .WithMany("StockTransactions")
                        .HasForeignKey("UserId");

                    b.Navigation("Items");

                    b.Navigation("StoreKeeper");

                    b.Navigation("Stores");

                    b.Navigation("User");
                });

            modelBuilder.Entity("VehicleServer.Entities.StoreKeeper", b =>
                {
                    b.HasOne("VehicleServer.Entities.Store", "Store")
                        .WithMany("StoreKeepers")
                        .HasForeignKey("StoreId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Store");
                });

            modelBuilder.Entity("VehicleServer.Entities.Category", b =>
                {
                    b.Navigation("Items");
                });

            modelBuilder.Entity("VehicleServer.Entities.Item", b =>
                {
                    b.Navigation("Stock");

                    b.Navigation("StockTransactions");
                });

            modelBuilder.Entity("VehicleServer.Entities.Store", b =>
                {
                    b.Navigation("Stock");

                    b.Navigation("StocksTransactions");

                    b.Navigation("StoreKeepers");
                });

            modelBuilder.Entity("VehicleServer.Entities.StoreKeeper", b =>
                {
                    b.Navigation("StockTransactions");
                });

            modelBuilder.Entity("VehicleServer.Entities.User", b =>
                {
                    b.Navigation("StockTransactions");
                });
#pragma warning restore 612, 618
        }
    }
}
