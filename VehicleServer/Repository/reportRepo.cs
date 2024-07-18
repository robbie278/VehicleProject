using AutoMapper;
using Microsoft.EntityFrameworkCore;
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

        public async Task<Stock> GetStockById(int id)
        {
            return await _context.Stocks.FindAsync(id);
        }

        public async Task<List<Stock>> GetAllStocks()
        {
            return await _context.Stocks.ToListAsync();
        }

        // Add a method to get the total quantity of each item in stock
        public async Task<List<Stock>> GetTotalQuantityByItem()
        {
            var result = await _context.Stocks
                .GroupBy(s => s.ItemId)
                .Select(g => new Stock
                {
                    
                    ItemId = g.Key,
                    QuantityInStock = g.Sum(s => s.QuantityInStock),
                    
                })
                .ToListAsync();

            // Now join with Items to get Item names
            var items = await _context.Items.ToListAsync(); // Fetch all items (adjust as per your needs)

            foreach (var stock in result)
            {
                var item = items.FirstOrDefault(i => i.ItemId == stock.ItemId);
                if (item != null)
                {
                    stock.ItemId = item.ItemId;
                }
            }

            return result;
        }

    }
}
