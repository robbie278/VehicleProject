namespace VehicleServer.Entities
{
    
    
        public class Stock
        {
            public int StockId { get; set; }
            public int ItemId { get; set; }
            public int StoreId { get; set; }
        
            public int QuantityInStock { get; set; }
            public DateTime LastUpdatedDate { get; set; } = DateTime.Now;
            public virtual Item? Items { get; set; }
            public virtual Store? Stores { get; set; }
        }

}
