using VehicleServer.Entities;

namespace VehicleServer.Services.StockTransactionDetailServices
{
    public interface IStockTransactionDetailService
    {
        Task BulkInsertTransactionsAsync(StockTransaction transaction);
        Task BulkUpdateItemDetailsTransactionAsync(StockTransaction transaction);
        Task UpdateStockAsync(int itemId, int storeId, int quantityChange);
        Task<bool> ValidateTransactionAsync(StockTransactionDetail transactionDetail, int padNumberStart, int padNumberEnd);
        Task<bool> IsDuplicateEntryAsync(int itemId, int padNumber);
        Task<bool> CanIssueTransactionAsync(int itemId, int padNumber);
        Task<bool> CanReceiveTransactionAsync(int itemId, int padNumber);
    }
}
