using VehicleServer.Entities;

namespace VehicleServer.DTOs
{
    public class StockDto
    {
        public int StockId { get; set; }
        public int ItemId { get; set; }
        public int StoreId { get; set; }
        public int QuantityInStock { get; set; }
        public DateTime LastUpdatedDate { get; set; } = DateTime.Now;
        public string? ItemName { get; set; }
        public string? StoreName { get; set; }



    }
}
