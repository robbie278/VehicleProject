using VehicleServer.DTOs;
using VehicleServer.Entities;

namespace VehicleServer.Services.StockTransactionDetailServices
{
    public interface IStockItemsDetailService
    {
        Task SingleInsertTransactionsAsync(StockTransaction transaction);
        Task BulkInsertTransactionsAsync(StockTransaction transaction);
        Task BulkUpdateItemDetailsTransactionAsync(StockTransaction transaction);
        Task SingleUpdateItemDetailsTransactionAsync(StockTransaction transaction);
        Task UpdateStockAsync(int itemId, int storeId, int quantityChange);

        // Refactored validation methods with additional parameters
        Task<bool> ValidateTransactionAsync(StockItemsDetail transactionDetail, int padNumberStart, int padNumberEnd);
        Task<bool> ValidateSingleTransactionAsync(StockItemsDetail transactionDetail, int padNumber);


        // Refactored methods with additional parameters for item validation
        Task<bool> IsDuplicateEntryAsync(int itemId, int padNumber, bool? IsPlate, int? PlateRegionId, int? MajorId, int? MinorId);
        Task<bool> CanIssueTransactionAsync(int itemId, int padNumber, bool? isPlate, int? PlateRegionId, int? MajorId, int? MinorId);
        Task<bool> CanReceiveTransactionAsync(int itemId, int padNumber, bool? isPlate, int? PlateRegionId, int? MajorId, int? MinorId);
        Task<bool> CanReturnTransactionAsync(int itemId, int padNumber, bool? isPlate, int? PlateRegionId, int? MajorId, int? MinorId);


        Task<PadNumberRangeDto> GetAvailablePadNumbers(int quantity);


    }
}
