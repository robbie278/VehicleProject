using VehicleServer.Entities;

namespace VehicleServer.DTOs
{
    public class StockDto
    {
        public int StockId { get; set; }
        public int ItemId { get; set; }
        public int StoreId { get; set; }

        //for tracking the stored stockes
        public int QuantityInStock { get; set; }
        public DateTime LastUpdatedDate { get; set; } = DateTime.Now;
        public virtual Item? Items { get; set; }
        public virtual Store? Stores { get; set; }
    }
}
