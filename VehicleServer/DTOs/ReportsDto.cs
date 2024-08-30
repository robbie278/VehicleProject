namespace VehicleServer.DTOs
{
    public class StockSummaryDto
    {
        public int StoreId { get; set; }
        public string StoreName { get; set; }
        public List<StockItemDto> Items { get; set; }
    }

    public class StockItemDto
    {
        public int ItemId { get; set; }
        public string ItemName { get; set; }
        public int QuantityInStock { get; set; }
        public DateTime LastUpdatedDate { get; set; }
        public int ReorderLevel { get; set; }
    }

    public class StockTransactionsDto
    {
        public int TransactionId { get; set; }
        public int ItemId { get; set; }
        public string ItemName { get; set; }
        public string TransactionType { get; set; }
        public int Quantity { get; set; }
        public DateTime TransactionDate { get; set; }
        public int StoreId { get; set; }
        public string StoreName { get; set; }
        public int? UserId { get; set; }
        public string UserName { get; set; }
    }

    public class StorePerformanceDto
    {
        public int StoreId { get; set; }
        public string StoreName { get; set; }
        public double StockTurnoverRatio { get; set; }
        public List<StockItemDto> ItemsNeedingReorder { get; set; }
        public EfficiencyDto Efficiency { get; set; }
    }

    public class EfficiencyDto
    {
        public int Stockouts { get; set; }
        public int Overstock { get; set; }
    }

    public class ItemTransactionHistoryDto
    {
        public int ItemId { get; set; }
        public string ItemName { get; set; }
        public List<TransactionDto> Transactions { get; set; }
    }

    public class TransactionDto
    {
        public int TransactionId { get; set; }
        public int StoreId { get; set; }
        public string StoreName { get; set; }
        public string TransactionType { get; set; }
        public int Quantity { get; set; }
        public DateTime TransactionDate { get; set; }
        public int? UserId { get; set; }
        public string UserName { get; set; }
    }
}
