using VehicleServer.DTOs;
using VehicleServer.Entities;
using VehicleServer.Repository;

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
        Task<bool> IsDuplicateEntryAsync(int itemId, int padNumber, string prefix, bool? IsPlate, int? PlateRegionId, int? MajorId, int? MinorId);
        Task<bool> CanIssueTransactionAsync(int itemId, int padNumber, string prefix, bool? isPlate, int? PlateRegionId, int? MajorId, int? MinorId);
        Task<bool> CanReceiveTransactionAsync(int itemId, int padNumber, string prefix, bool? isPlate, int? PlateRegionId, int? MajorId, int? MinorId);
        Task<bool> CanReturnTransactionAsync(int itemId, int padNumber, string prefix, bool? isPlate, int? PlateRegionId, int? MajorId, int? MinorId);


        Task<PadNumberRangeDto> GetAvailablePadNumbers(int quantity);

        Task<ApiResult<StockItemsDetailDto>> GetStockItemsDetailAsync(int storeId, int itemId, int pageIndex, int pageSize, string? sortColumn = null, string? sortOrder = null, string? filterColumn = null, string? filterQuery = null    );
        Task<IEnumerable<StockItemsDetail>> GetAllStockItemsDetailsAsync();
        Task<IEnumerable<StockItemsDetail>> GetStockItemsDetailsByStoreIdAsync(int storeId);
        Task<IEnumerable<StockItemsDetail>> GetStockItemsDetailsByTransactionTypeAsync(string transactionType);
       
    }
}
