using AutoMapper;
using Microsoft.EntityFrameworkCore;
using VehicleServer.DTOs;
using VehicleServer.Entities;

namespace VehicleServer.Repository
{
    public class StockItemsDetailRepo
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
                                    StoreName = c.Stores!.Name
                                        
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

    }
}
