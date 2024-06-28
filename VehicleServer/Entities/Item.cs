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

        public ICollection<Stock>? Stock { get; set; }
        public ICollection<StockTransaction>? StockTransactions { get; set; }

    }

}
