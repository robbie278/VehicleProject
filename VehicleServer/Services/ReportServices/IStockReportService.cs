using VehicleServer.DTOs;

namespace VehicleServer.Services.ReportServices
{
    public interface IStockReportService
    {
        Task<List<StockSummaryDto>> GetStockSummaryAsync();
        Task<List<StockTransactionsDto>> GetStockTransactionsAsync(DateTime? startDate, DateTime? endDate, int? storeId, int? itemId, string transactionType);
        Task<List<StorePerformanceDto>> GetStorePerformanceAsync();
        Task<ItemTransactionHistoryDto> GetItemTransactionHistoryAsync(int itemId, DateTime? startDate, DateTime? endDate, int? storeId);
    }
}
