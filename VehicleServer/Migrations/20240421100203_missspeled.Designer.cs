﻿// <auto-generated />
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
    [Migration("20240421100203_missspeled")]
    partial class missspeled
    {
        /// <inheritdoc />
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "7.0.0")
                .HasAnnotation("Relational:MaxIdentifierLength", 128);

            SqlServerModelBuilderExtensions.UseIdentityColumns(modelBuilder);

            modelBuilder.Entity("ItemStore", b =>
                {
                    b.Property<int>("ItemsItemId")
                        .HasColumnType("int");

                    b.Property<int>("StoresStoreId")
                        .HasColumnType("int");

                    b.HasKey("ItemsItemId", "StoresStoreId");

                    b.HasIndex("StoresStoreId");

                    b.ToTable("ItemStore");

                    b.HasData(
                        new
                        {
                            ItemsItemId = 1,
                            StoresStoreId = 1
                        },
                        new
                        {
                            ItemsItemId = 1,
                            StoresStoreId = 3
                        },
                        new
                        {
                            ItemsItemId = 2,
                            StoresStoreId = 3
                        },
                        new
                        {
                            ItemsItemId = 3,
                            StoresStoreId = 1
                        },
                        new
                        {
                            ItemsItemId = 3,
                            StoresStoreId = 2
                        },
                        new
                        {
                            ItemsItemId = 3,
                            StoresStoreId = 3
                        },
                        new
                        {
                            ItemsItemId = 4,
                            StoresStoreId = 2
                        });
                });

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

                    b.HasData(
                        new
                        {
                            CategoryId = 1,
                            Name = "Bolo"
                        },
                        new
                        {
                            CategoryId = 2,
                            Name = "Libery"
                        },
                        new
                        {
                            CategoryId = 3,
                            Name = "Ticket"
                        },
                        new
                        {
                            CategoryId = 4,
                            Name = "Licence"
                        });
                });

            modelBuilder.Entity("VehicleServer.Entities.Item", b =>
                {
                    b.Property<int>("ItemId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("ItemId"));

                    b.Property<bool>("Availability")
                        .HasColumnType("bit");

                    b.Property<int>("CategoryId")
                        .HasColumnType("int");

                    b.Property<string>("Description")
                        .HasMaxLength(200)
                        .HasColumnType("nvarchar(200)");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasMaxLength(15)
                        .HasColumnType("nvarchar(15)");

                    b.Property<int>("Quantity")
                        .HasColumnType("int");

                    b.HasKey("ItemId");

                    b.HasIndex("CategoryId");

                    b.ToTable("Items");

                    b.HasData(
                        new
                        {
                            ItemId = 1,
                            Availability = true,
                            CategoryId = 3,
                            Name = "Type1",
                            Quantity = 500
                        },
                        new
                        {
                            ItemId = 2,
                            Availability = true,
                            CategoryId = 3,
                            Name = "Type2",
                            Quantity = 700
                        },
                        new
                        {
                            ItemId = 3,
                            Availability = true,
                            CategoryId = 4,
                            Name = "Taxi",
                            Quantity = 2300
                        },
                        new
                        {
                            ItemId = 4,
                            Availability = true,
                            CategoryId = 4,
                            Name = "Private",
                            Quantity = 6480
                        });
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

                    b.HasData(
                        new
                        {
                            StoreId = 1,
                            Address = "Piassa",
                            Name = "AradaStore"
                        },
                        new
                        {
                            StoreId = 2,
                            Address = "Gofa",
                            Name = "LaftoStore"
                        },
                        new
                        {
                            StoreId = 3,
                            Address = "Kality",
                            Name = "KalityStore"
                        });
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

                    b.HasData(
                        new
                        {
                            StoreKeeperId = 1,
                            Email = "kaleab@email.com",
                            Name = "Kaleab",
                            StoreId = 2
                        },
                        new
                        {
                            StoreKeeperId = 2,
                            Email = "yabsera@email.com",
                            Name = "Yabsera",
                            StoreId = 3
                        },
                        new
                        {
                            StoreKeeperId = 3,
                            Email = "robera@email.com",
                            Name = "Robera",
                            StoreId = 1
                        });
                });

            modelBuilder.Entity("ItemStore", b =>
                {
                    b.HasOne("VehicleServer.Entities.Item", null)
                        .WithMany()
                        .HasForeignKey("ItemsItemId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("VehicleServer.Entities.Store", null)
                        .WithMany()
                        .HasForeignKey("StoresStoreId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("VehicleServer.Entities.Item", b =>
                {
                    b.HasOne("VehicleServer.Entities.Category", "Category")
                        .WithMany("Items")
                        .HasForeignKey("CategoryId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Category");
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

            modelBuilder.Entity("VehicleServer.Entities.Store", b =>
                {
                    b.Navigation("StoreKeepers");
                });
#pragma warning restore 612, 618
        }
    }
}