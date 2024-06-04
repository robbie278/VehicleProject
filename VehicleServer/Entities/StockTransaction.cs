namespace VehicleServer.Entities
{
    public class StockTransaction
    {
        public int TransactionId { get; set; }
        public int ItemId { get; set; }
        public int StoreId { get; set; }
        public int? UserId { get; set; }
        public int StoreKeeperId { get; set; }
        public string TransactionType { get; set; } // Issue or Receipt
        public int Quantity { get; set; }
        public int PadNumberStart { get; set; }
        public int PadNumberEnd { get; set; }
        public DateTime TransactionDate { get; set; } = DateTime.Now;
        public virtual Item? Items { get; set; }
        public virtual Store? Stores { get; set; }
        public virtual User? User { get; set; }
        public virtual StoreKeeper? StoreKeeper { get; set; }

    }

}
