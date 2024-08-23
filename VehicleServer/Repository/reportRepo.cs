using AutoMapper;
using Microsoft.EntityFrameworkCore;
using VehicleServer.DTOs;
using VehicleServer.Entities;

namespace VehicleServer.Repository
{
    public class reportRepo
    {
        private readonly IMapper _mapper;
        private readonly ApplicationContext _context;
        public reportRepo(IMapper mapper, ApplicationContext context)
        {
            this._mapper = mapper;
            this._context = context;

        }

        // getting balance by store
        public async Task<List<StockDto>> GetBalanceByStore()
        {
            var results = await (from detail in _context.StockItemsDetail
                                 join store in _context.Stores
                                 on detail.StoreId equals store.StoreId
                                 group detail by new { detail.StoreId, store.Name } into g
                                 select new StockDto
                                 {
                                     StoreId = g.Key.StoreId,
                                     StoreName = g.Key.Name,
                                     QuantityInStock = g.Sum(d => d.TransactionType == "Receipt" ? d.PadNumber : -d.PadNumber),
                                     LastUpdatedDate = g.Max(d => d.TransactionDate)
                                 }).ToListAsync();

            return results;
        }

        //getting balance by item
        public async Task<List<StockDto>> GetBalanceByItem()
        {
            var results = await (from detail in _context.StockItemsDetail
                                 join item in _context.Items
                                 on detail.ItemId equals item.ItemId
                                 group detail by new { detail.ItemId, item.Name } into g
                                 select new StockDto
                                 {
                                     ItemId = g.Key.ItemId,
                                     ItemName = g.Key.Name,
                                     QuantityInStock = g.Sum(d => d.TransactionType == "Receipt" ? d.PadNumber : -d.PadNumber),
                                     LastUpdatedDate = g.Max(d => d.TransactionDate)
                                 }).ToListAsync();

            return results;
        }


        public async Task<List<StockDto>> GetTotalQuantityByStore()
        {
            var results = await (from stock in _context.Stocks
                                 join store in _context.Stores
                                 on stock.StoreId equals store.StoreId
                                 group stock by new { stock.StoreId, store.Name } into g
                                 select new StockDto
                                 {
                                     StoreId = g.Key.StoreId,
                                     StoreName = g.Key.Name,
                                     QuantityInStock = g.Sum(s => s.QuantityInStock),
                                     LastUpdatedDate = g.Max(s => s.LastUpdatedDate) // or DateTime.Now if you want current date
                                 }).ToListAsync();

            return results;
        }


        // Add a method to get the total quantity of each item in stock
        public async Task<List<StockDto>> GetTotalQuantityByItem()
        {
            var results = await (from stock in _context.Stocks
                                 join item in _context.Items
                                 on stock.ItemId equals item.ItemId
                                 group stock by new { stock.ItemId, item.Name } into g
                                 select new StockDto
                                 {
                                     ItemId = g.Key.ItemId,
                                     ItemName = g.Key.Name,
                                     QuantityInStock = g.Sum(s => s.QuantityInStock),
                                     LastUpdatedDate = g.Max(s => s.LastUpdatedDate) // or DateTime.Now if you want current date
                                 }).ToListAsync();

            return results;
        }

    }
}
