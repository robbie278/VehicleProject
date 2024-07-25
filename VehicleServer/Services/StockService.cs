using Microsoft.EntityFrameworkCore;
using System;
using System.Linq;
using System.Threading.Tasks;
using VehicleServer.Entities;

namespace VehicleServer.Services
{
    public class StockService
    {
        private readonly ApplicationContext _context;

        public StockService(ApplicationContext context)
        {
            _context = context;
        }

        public async Task HandleStockTransaction(StockTransaction transaction)
        {

            // Add the transaction to the database
            _context.StockTransactions.Add(transaction);

            // Get the current stock for the item and store
            var stock = await _context.Stocks
                .FirstOrDefaultAsync(s => s.ItemId == transaction.ItemId && s.StoreId == transaction.StoreId);

            if (stock == null)
            {
                // If there's no stock record, create a new one
                stock = new Stock
                {
                    ItemId = transaction.ItemId,
                    StoreId = transaction.StoreId,
                    QuantityInStock = 0, // Default to 0 if no stock record exists
                    LastUpdatedDate = DateTime.Now
                };
                _context.Stocks.Add(stock);
            }

            // Update the stock quantity based on the transaction type
            if (transaction.TransactionType == "Issue")
            {
                stock.QuantityInStock -= transaction.Quantity;
            }
            else if (transaction.TransactionType == "Receipt")
            {
                stock.QuantityInStock += transaction.Quantity;
            }

            // Update the last updated date
            stock.LastUpdatedDate = DateTime.Now;

            // Save changes to the database
            await _context.SaveChangesAsync();
        }
        public async Task<bool> CanIssueTransactionAsync(int itemId, int storeId, int issueAmmount)
        {
            var transaction = await _context.Stocks.FirstOrDefaultAsync(s => s.ItemId == itemId && s.StoreId == storeId);
            return transaction != null && transaction.QuantityInStock >= issueAmmount;
        }

    }
}
