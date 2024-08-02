namespace VehicleServer.Entities
{
    public class Item
    {
        public int ItemId { get; set; }
        public string? Name { get; set; }
        public string? Description { get; set; }
        public int CategoryId { get; set; }
        public Category? Category { get; set; }
        public bool? IsDeleted { get; set; }

        // New navigation properties
        public ICollection<Stock>? Stock { get; set; }
        public ICollection<StockTransaction>? StockTransactions { get; set; }

        // a plate related properties
         // Foreign key
        public int PlatePoolId { get; set; }

    // Navigation property
        public PlatePool PlatePool { get; set; }

    }

}
