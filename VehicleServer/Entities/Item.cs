﻿namespace VehicleServer.Entities
{
    public class Item
    {
        public int ItemId { get; set; }
        public string? Name { get; set; }
        public string? Description { get; set; }
        public int Quantity { get; set; }
        public bool Availability { get; set; }
        public int CategoryId { get; set; }
        public Category? Category { get; set; }
        public ICollection<Store> Stores { get; set; } = new List<Store>();

    }

}
