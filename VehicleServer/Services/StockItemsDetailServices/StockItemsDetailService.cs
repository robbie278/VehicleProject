using Microsoft.EntityFrameworkCore;
using VehicleServer.DTOs;
using VehicleServer.Entities;
using VehicleServer.Enums;

namespace VehicleServer.Services.StockTransactionDetailServices
{
    public class StockItemsDetailService : IStockItemsDetailService
    {
        private readonly ApplicationContext _context;
        //private TransactionType 
        public StockItemsDetailService(ApplicationContext context)
        {
            _context = context;
        }
        public async Task<bool> ValidateTransactionAsync(StockItemsDetail transactionDetail, int padNumberStart, int padNumberEnd)
        {
            if (padNumberEnd < padNumberStart)
            {
                return false;
            }

            for (int padNumber = padNumberStart; padNumber <= padNumberEnd; padNumber++)
            {
                if (transactionDetail.TransactionType == TransactionType.Receipt && await IsDuplicateEntryAsync(transactionDetail.ItemId, padNumber))
                {
                    return false;
                }

                if ((transactionDetail.TransactionType == TransactionType.Issue || transactionDetail.TransactionType == TransactionType.Damaged) && !await CanIssueTransactionAsync(transactionDetail.ItemId, padNumber))
                {
                    return false;
                }

                if (transactionDetail.TransactionType == TransactionType.Receipt && !await CanReceiveTransactionAsync(transactionDetail.ItemId, padNumber))
                {
                    return false;
                }
                if (transactionDetail.TransactionType == TransactionType.Return && !await CanReturnTransactionAsync(transactionDetail.ItemId, padNumber))
                {
                    return false;
                }
            }

            return true;
        }

        public async Task<bool> IsDuplicateEntryAsync(int itemId, int padNumber)
        {
            return await _context.StockItemsDetail.AnyAsync(s => s.ItemId == itemId && s.PadNumber == padNumber);
        }

        public async Task<bool> CanIssueTransactionAsync(int itemId, int padNumber)
        {
            var transaction = await _context.StockItemsDetail.FirstOrDefaultAsync(s => s.ItemId == itemId && s.PadNumber == padNumber);
            return transaction != null && transaction.TransactionType == TransactionType.Receipt;
        }

        public async Task<bool> CanReceiveTransactionAsync(int itemId, int padNumber)
        {
            return !await _context.StockItemsDetail.AnyAsync(s => s.ItemId == itemId && s.PadNumber == padNumber);
        }

        public async Task<bool> CanReturnTransactionAsync(int itemId, int padNumber)
        {
            var transaction = await _context.StockItemsDetail.FirstOrDefaultAsync(s => s.ItemId == itemId && s.PadNumber == padNumber);
            return transaction != null && transaction.TransactionType == TransactionType.Issue;
        }

        public async Task BulkInsertTransactionsAsync(StockTransaction transaction)
        {
            var transactionDetails = new List<StockItemsDetail>();

            for (int padNumber = transaction.PadNumberStart; padNumber <= transaction.PadNumberEnd; padNumber++)
            {
                transactionDetails.Add(new StockItemsDetail
                {
                    ItemId = transaction.ItemId,
                    StoreId = transaction.StoreId,
                    UserId = transaction.UserId,
                    StoreKeeperId = transaction.StoreKeeperId,
                    TransactionType = transaction.TransactionType,
                    PadNumber = padNumber,
                    TransactionDate = transaction.TransactionDate
                });
            }

            await _context.StockItemsDetail.AddRangeAsync(transactionDetails);
            await _context.StockTransactions.AddAsync(transaction);
            await _context.SaveChangesAsync();

            await UpdateStockAsync(transaction.ItemId, transaction.StoreId, transaction.TransactionType != TransactionType.Return ? transaction.Quantity : -transaction.Quantity);
        }

        public async Task BulkUpdateItemDetailsTransactionAsync(StockTransaction transaction)
        {
             
            var transactionsToUpdate = _context.StockItemsDetail
                .Where(t => t.PadNumber >= transaction.PadNumberStart && t.PadNumber <= transaction.PadNumberEnd)
                .ToList();

            foreach (var trans in transactionsToUpdate)
            {
                if(transaction.TransactionType == TransactionType.Return)
                {
                    trans.TransactionType = TransactionType.Receipt;

                }
                else
                {
                    trans.TransactionType = transaction.TransactionType;
                }
            }

            _context.StockItemsDetail.UpdateRange(transactionsToUpdate);
            await _context.StockTransactions.AddAsync(transaction);

            await _context.SaveChangesAsync();
            await UpdateStockAsync(transaction.ItemId, transaction.StoreId, transaction.TransactionType == TransactionType.Return ? transaction.Quantity : -transaction.Quantity);
        }


        public async Task UpdateStockAsync(int itemId, int storeId, int quantityChange)
        {
            var stock = await _context.Stocks.FirstOrDefaultAsync(s => s.ItemId == itemId && s.StoreId == storeId);
            if (stock == null)
            {
                // If there's no stock record, create a new one
                stock = new Stock
                {
                    ItemId = itemId,
                    StoreId = storeId,
                    QuantityInStock = 0, // Default to 0 if no stock record exists
                    LastUpdatedDate = DateTime.Now
                };
                _context.Stocks.Add(stock);
                await _context.SaveChangesAsync();
            }

            stock.QuantityInStock += quantityChange;
                stock.LastUpdatedDate = DateTime.Now;

                if (stock.QuantityInStock < 0)
                {
                    throw new InvalidOperationException("Cannot issue more than available in stock.");
                }

                _context.Stocks.Update(stock);
                await _context.SaveChangesAsync();
        }

        public async Task<PadNumberRangeDto> GetAvailablePadNumbers(int quantity)
        {
            // Logic to find the available pad numbers based on quantity
            
            var availablePadNumbers = _context.StockItemsDetail
                .Where(st => st.TransactionType == TransactionType.Receipt) 
                .Select(st => st.PadNumber)
                .OrderBy(pn => pn)
                .ToList();

            if (availablePadNumbers.Count < quantity)
            {
                return null; // Not enough pad numbers available
            }

            var start = availablePadNumbers.First();
            var end = start + quantity - 1;

            // Ensure the range is valid
            if (availablePadNumbers.Take(quantity).Last() != end)
            {
                return null; // Not a contiguous range
            }

            var padNumberRangeDto = new PadNumberRangeDto
            {
                Start = start,
                End = end
            };

            return await Task.FromResult(padNumberRangeDto);
        }
    

}
}
