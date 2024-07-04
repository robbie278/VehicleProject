using VehicleServer.DTOs;
using VehicleServer.Entities;

namespace VehicleServer.Services.StockTransactionDetailServices
{
    public interface IStockItemsDetailService
    {
        Task SingleInsertTransactionsAsync(StockTransaction transaction);
        Task BulkInsertTransactionsAsync(StockTransaction transaction);
        Task BulkUpdateItemDetailsTransactionAsync(StockTransaction transaction);
        Task UpdateStockAsync(int itemId, int storeId, int quantityChange);
        Task<bool> ValidateTransactionAsync(StockItemsDetail transactionDetail, int padNumberStart, int padNumberEnd);
        Task<bool> ValidateSingleTransactionAsync(StockItemsDetail transactionDetail, int padNumber);
        Task<bool> IsDuplicateEntryAsync(int itemId, int padNumber);
        Task<bool> CanIssueTransactionAsync(int itemId, int padNumber);
        Task<bool> CanReceiveTransactionAsync(int itemId, int padNumber);
        Task<bool> CanReturnTransactionAsync(int itemId, int padNumber);
        Task<PadNumberRangeDto> GetAvailablePadNumbers(int quantity);


    }
}
