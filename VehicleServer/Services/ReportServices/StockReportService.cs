using Microsoft.EntityFrameworkCore;
using VehicleServer.DTOs;

namespace VehicleServer.Services.ReportServices
{
    public class StockReportService : IStockReportService
    {
        private readonly ApplicationContext _context;

        public StockReportService(ApplicationContext context)
        {
            _context = context;
        }

        public async Task<List<StockSummaryDto>> GetStockSummaryAsync()
        {
            var stockSummary = await _context.Stocks
                .Include(s => s.Items)  // Include the related Item
                .Include(s => s.Stores) // Include the related Store
                .Select(s => new StockSummaryDto
                {
                    StoreId = s.StoreId,
                    StoreName = s.Stores.Name,
                    Items = new List<StockItemDto>
                    {
                new StockItemDto
                {
                    ItemId = s.ItemId,
                    ItemName = s.Items.Name,
                    QuantityInStock = s.QuantityInStock,
                    LastUpdatedDate = s.LastUpdatedDate
                }
                    }
                }).ToListAsync();

            return stockSummary;
        }



        public async Task<List<StockTransactionsDto>> GetStockTransactionsAsync(DateTime? startDate, DateTime? endDate, int? storeId, int? itemId, string transactionType)
        {
            var query = _context.StockTransactions.AsQueryable();

            if (startDate.HasValue)
                query = query.Where(t => t.TransactionDate >= startDate.Value);

            if (endDate.HasValue)
                query = query.Where(t => t.TransactionDate <= endDate.Value);

            if (storeId.HasValue)
                query = query.Where(t => t.StoreId == storeId.Value);

            if (itemId.HasValue)
                query = query.Where(t => t.ItemId == itemId.Value);

            if (!string.IsNullOrEmpty(transactionType))
                query = query.Where(t => t.TransactionType == transactionType);

            var transactions = await query
                .Include(t => t.Items)
                .Include(t => t.Stores)
                .Include(t => t.User)
                .Select(t => new StockTransactionsDto
                {
                    TransactionId = t.StockTransactionId,
                    ItemId = t.ItemId,
                    ItemName = t.Items.Name,
                    TransactionType = t.TransactionType,
                    Quantity = t.Quantity,
                    TransactionDate = t.TransactionDate,
                    StoreId = t.StoreId,
                    StoreName = t.Stores.Name,
                    UserId = t.UserId,
                    UserName = t.User != null ? t.User.UserName : null
                }).ToListAsync();

            return transactions;
        }

        public async Task<List<StorePerformanceDto>> GetStorePerformanceAsync()
        {
            var performanceData = await _context.Stocks
                .Include(s => s.Items)
                .Include(s => s.Stores)
                .GroupBy(s => new { s.StoreId, s.Stores.Name })
                .Select(g => new StorePerformanceDto
                {
                    StoreId = g.Key.StoreId,
                    StoreName = g.Key.Name,
                    StockTurnoverRatio = g.Sum(s => s.QuantityInStock) / (g.Sum(s => s.QuantityInStock) + 1), // Simplified ratio
                   
                }).ToListAsync();

            return performanceData;
        }


        public async Task<ItemTransactionHistoryDto> GetItemTransactionHistoryAsync(int itemId, DateTime? startDate, DateTime? endDate, int? storeId)
        {
            var query = _context.StockTransactions
                .Where(t => t.ItemId == itemId);

            if (startDate.HasValue)
                query = query.Where(t => t.TransactionDate >= startDate.Value);

            if (endDate.HasValue)
                query = query.Where(t => t.TransactionDate <= endDate.Value);

            if (storeId.HasValue)
                query = query.Where(t => t.StoreId == storeId.Value);

            var transactionHistory = await query
                .Include(t => t.Items)
                .Include(t => t.Stores)
                .Select(t => new ItemTransactionHistoryDto
                {
                    ItemId = t.ItemId,
                    ItemName = t.Items.Name,
                    Transactions = query.Select(t => new TransactionDto
                    {
                        TransactionId = t.StockTransactionId,
                        StoreId = t.StoreId,
                        StoreName = t.Stores.Name,
                        TransactionType = t.TransactionType,
                        Quantity = t.Quantity,
                        TransactionDate = t.TransactionDate,
                        UserId = t.UserId,
                        UserName = t.User != null ? t.User.UserName : null
                    }).ToList()
                }).FirstOrDefaultAsync();

            return transactionHistory;
        }
    }
}
