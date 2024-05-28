using VehicleServer.Entities;

namespace VehicleServer.DTOs
{
    public class StockTransactionDto
    {
        public int TransactionId { get; set; }
        public int ItemId { get; set; }
        public int StoreId { get; set; }
        public int? UserId { get; set; }
        public int StoreKeeperId { get; set; }
        public string TransactionType { get; set; } // Issue or Receipt
        public int Quantity { get; set; }
        public string? StoreName { get; set; }
        public string? StoreKeeperName { get; set; }
        public string? UserName { get; set; }
        public string? ItemName { get; set; }

    }
}
