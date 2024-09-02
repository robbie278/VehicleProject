using AutoMapper;
using Microsoft.EntityFrameworkCore;
using VehicleServer.DTOs;
using VehicleServer.Entities;

namespace VehicleServer.Repository
{
    public interface IStockItemsDetailRepository
    {
        Task<IEnumerable<StockItemsDetail>> GetAllAsync();
        Task<IEnumerable<StockItemsDetail>> GetByStoreIdAsync(int storeId);
        Task<IEnumerable<StockItemsDetail>> GetByTransactionTypeAsync(string transactionType);
        Task<ApiResult<StockItemsDetailDto>> GetStockItemsDetailAsync(int storeId, int itemId,
            int pageIndex,
            int pageSize,
            string? sortColumn = null,
            string? sortOrder = null,
            string? filterColumn = null,
            string? filterQuery = null
            );
    }
    public class StockItemsDetailRepo : IStockItemsDetailRepository
    {
        private readonly ApplicationContext _context;

        public StockItemsDetailRepo( ApplicationContext context)
        {
            this._context = context;
        }

        public async Task<ApiResult<StockItemsDetailDto>> GetStockItemsDetailAsync(
            int storeId,
            int itemId, 
            int pageIndex,
            int pageSize, 
            string? sortColumn = null, 
            string? sortOrder = null,  
            string? filterColumn = null,
            string? filterQuery = null
            )
        {
            var query = _context.StockItemsDetail.AsNoTracking()
                                .Where(s => s.StoreId == storeId && s.ItemId == itemId &&
                                (s.TransactionType == "Return" || s.TransactionType == "Receipt"))
                                .Select(c => new StockItemsDetailDto()
                                {
                                    StockItemsDetailId = c.StockItemsDetailId,
                                    ItemId = c.ItemId,
                                    StoreId = c.StoreId,
                                    PadNumber = c.PadNumber,
                                    ItemName = c.Items!.Name,
                                    StoreName = c.Stores!.Name,
                                    Prefix = c.Prefix
                                        
                                });

            return await ApiResult<StockItemsDetailDto>.CreateAsync(
                query,
                pageIndex,
                pageSize,
                sortColumn,
                sortOrder,
                filterColumn,
                filterQuery
            );
        }

        public async Task<IEnumerable<StockItemsDetail>> GetAllAsync()
        {
            return await _context.StockItemsDetail
                .Include(sid => sid.Items)
                .Include(sid => sid.Stores)
                .Include(sid => sid.User)
                //.Include(sid => sid.StoreKeeper)
                .ToListAsync();
        }

        public async Task<IEnumerable<StockItemsDetail>> GetByStoreIdAsync(int storeId)
        {
            return await _context.StockItemsDetail
                .Include(sid => sid.Items)
                .Include(sid => sid.Stores)
                .Include(sid => sid.User)
                //.Include(sid => sid.StoreKeeper)
                .Where(sid => sid.StoreId == storeId)
                .ToListAsync();
        }

        public async Task<IEnumerable<StockItemsDetail>> GetByTransactionTypeAsync(string transactionType)
        {
            return await _context.StockItemsDetail
                .Include(sid => sid.Items)
                .Include(sid => sid.Stores)
                .Include(sid => sid.User)
                //.Include(sid => sid.StoreKeeper)
                .Where(sid => sid.TransactionType == transactionType)
                .ToListAsync();
        }

    }
}
