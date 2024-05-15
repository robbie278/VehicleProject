using VehicleServer.Entities;
using Microsoft.EntityFrameworkCore;
using System;


namespace VehicleServer.Seeding
{
    public static class Module3Sedding
    {
        public static void Seed(ModelBuilder modelBuilder)
        {
            //Seeding Category
            var bolo = new Category() { CategoryId = 1, Name = "Bolo" };
            var libery = new Category() { CategoryId = 2, Name = "Libery" };
            var ticket = new Category() { CategoryId = 3, Name = "Ticket" };
            var licence = new Category() { CategoryId = 4, Name = "Licence" };

            modelBuilder.Entity<Category>().HasData(bolo, libery, ticket, licence);

            //Seeding Item
            var type1 = new Item() 
            {
              ItemId = 1, 
              Name = "Type1", 
              Quantity = 500, 
              Availability = true,
              CategoryId = ticket.CategoryId
            
            };
            var type2 = new Item()
            {
                ItemId = 2,
                Name = "Type2",
                Quantity = 700,
                Availability = true,
                CategoryId = ticket.CategoryId

            };

            var taxi = new Item()
            {
                ItemId = 3,
                Name = "Taxi",
                Quantity = 2300,
                Availability = true,
                CategoryId = licence.CategoryId

            };

            var  Private = new Item()
            {
                ItemId = 4,
                Name = "Private",
                Quantity = 6480,
                Availability = true,
                CategoryId = licence.CategoryId

            };

            modelBuilder.Entity<Item>().HasData(type1 , type2, taxi, Private);


            //Sedding Store
            var arada = new Store() {StoreId = 1, Name = "AradaStore", Address = "Piassa" };
            var lafto = new Store() {StoreId = 2, Name = "LaftoStore", Address = "Gofa" };
            var kality = new Store() {StoreId = 3, Name = "KalityStore", Address = "Kality" };

            modelBuilder.Entity<Store>().HasData(arada,lafto, kality);


            //making many to many Relationships b/n Item and Store
            var entityItemStore = "ItemStore";
            var itemsId = "ItemsItemId";
            var storesId = "StoresStoreId";

            modelBuilder.Entity(entityItemStore).HasData(
             new Dictionary<string, object> { [itemsId] = type1.ItemId, [storesId] = arada.StoreId },
             new Dictionary<string, object> { [itemsId] = type1.ItemId, [storesId] = kality.StoreId },
             new Dictionary<string, object> { [itemsId] = type2.ItemId, [storesId] = kality.StoreId },
             new Dictionary<string, object> { [itemsId] = taxi.ItemId, [storesId] = arada.StoreId },
             new Dictionary<string, object> { [itemsId] = taxi.ItemId, [storesId] = lafto.StoreId },
             new Dictionary<string, object> { [itemsId] = taxi.ItemId, [storesId] = kality.StoreId },
             new Dictionary<string, object> { [itemsId] = Private.ItemId, [storesId] = lafto.StoreId }
             );

            //Seeding StoreKeeper
            var kaleab = new StoreKeeper()
            {
                StoreKeeperId = 1,
                Name = "Kaleab",
                Email = "kaleab@email.com",
                StoreId = lafto.StoreId,
            };

            var yabsera = new StoreKeeper()
            {
                StoreKeeperId = 2,
                Name = "Yabsera",
                Email = "yabsera@email.com",
                StoreId = kality.StoreId,
            };

            var robera = new StoreKeeper()
            {
                StoreKeeperId = 3,
                Name = "Robera",
                Email = "robera@email.com",
                StoreId = arada.StoreId,
            };

            modelBuilder.Entity<StoreKeeper>().HasData(kaleab, yabsera, robera);

        }
    }
}
