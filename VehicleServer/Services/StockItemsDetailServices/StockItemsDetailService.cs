﻿using Microsoft.EntityFrameworkCore;
using VehicleServer.Entities;

namespace VehicleServer.Services.StockTransactionDetailServices
{
    public class StockItemsDetailService : IStockItemsDetailService
    {
        private readonly ApplicationContext _context;

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
                if (transactionDetail.TransactionType == "Receipt" && await IsDuplicateEntryAsync(transactionDetail.ItemId, padNumber))
                {
                    return false;
                }

                if (transactionDetail.TransactionType == "Issue" && !await CanIssueTransactionAsync(transactionDetail.ItemId, padNumber))
                {
                    return false;
                }

                if (transactionDetail.TransactionType == "Receipt" && !await CanReceiveTransactionAsync(transactionDetail.ItemId, padNumber))
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
            return transaction != null && transaction.TransactionType != "issue";
        }

        public async Task<bool> CanReceiveTransactionAsync(int itemId, int padNumber)
        {
            return !await _context.StockItemsDetail.AnyAsync(s => s.ItemId == itemId && s.PadNumber == padNumber);
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

            await UpdateStockAsync(transaction.ItemId, transaction.StoreId, transaction.TransactionType == "issue" ? -transaction.Quantity : transaction.Quantity);
        }

        public async Task BulkUpdateItemDetailsTransactionAsync(StockTransaction transaction)
        {
             
            var transactionsToUpdate = _context.StockItemsDetail
                .Where(t => t.PadNumber >= transaction.PadNumberStart && t.PadNumber <= transaction.PadNumberEnd)
                .ToList();

            foreach (var trans in transactionsToUpdate)
            {
                trans.TransactionType = "Issue";
            }

            _context.StockItemsDetail.UpdateRange(transactionsToUpdate);
            await _context.StockTransactions.AddAsync(transaction);

            await _context.SaveChangesAsync();
            await UpdateStockAsync(transaction.ItemId, transaction.StoreId, -transaction.Quantity);
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

    }
}