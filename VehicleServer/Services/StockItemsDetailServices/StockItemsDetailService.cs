using Azure.Core;
using Microsoft.EntityFrameworkCore;
using NuGet.Protocol.Core.Types;
using VehicleServer.DTOs;
using VehicleServer.Entities;
using VehicleServer.Enums;
using VehicleServer.Repository;

namespace VehicleServer.Services.StockTransactionDetailServices
{
    public class StockItemsDetailService : IStockItemsDetailService
    {
        private readonly ApplicationContext _context;
        private readonly IStockItemsDetailRepository _repository;
        //private TransactionType 
        public StockItemsDetailService(ApplicationContext context, IStockItemsDetailRepository repository)
        {
            _context = context;
            _repository = repository;
        }



        public async Task<bool> ValidateTransactionAsync(StockItemsDetail transactionDetail, int padNumberStart, int padNumberEnd)
        {
            if (padNumberEnd < padNumberStart)
            {
                return false;
            }

            for (int padNumber = padNumberStart; padNumber <= padNumberEnd; padNumber++)
            {
                // Use the refactored IsDuplicateEntryAsync method
                if (transactionDetail.TransactionType == TransactionType.Receipt &&
                    await IsDuplicateEntryAsync(transactionDetail.ItemId, padNumber, transactionDetail.Prefix, transactionDetail.IsPlate, transactionDetail.PlateRegionId, transactionDetail.MajorId, transactionDetail.MinorId))
                {
                    return false;
                }

                if ((transactionDetail.TransactionType == TransactionType.Issue || transactionDetail.TransactionType == TransactionType.Damaged) &&
                    !await CanIssueTransactionAsync(transactionDetail.ItemId, padNumber, transactionDetail.Prefix, transactionDetail.IsPlate, transactionDetail.PlateRegionId, transactionDetail.MajorId, transactionDetail.MinorId))
                {
                    return false;
                }

                if (transactionDetail.TransactionType == TransactionType.Receipt &&
                    !await CanReceiveTransactionAsync(transactionDetail.ItemId, padNumber, transactionDetail.Prefix, transactionDetail.IsPlate, transactionDetail.PlateRegionId, transactionDetail.MajorId, transactionDetail.MinorId))
                {
                    return false;
                }

                if (transactionDetail.TransactionType == TransactionType.Return &&
                    !await CanReturnTransactionAsync(transactionDetail.ItemId, padNumber, transactionDetail.Prefix, transactionDetail.IsPlate, transactionDetail.PlateRegionId, transactionDetail.MajorId, transactionDetail.MinorId))
                {
                    return false;
                }
            }

            return true;
        }

        public async Task<bool> ValidateSingleTransactionAsync(StockItemsDetail transactionDetail, int padNumber)
        {
            if (padNumber == 0)
            {
                return false;
            }

            // Use the refactored IsDuplicateEntryAsync method
            if (transactionDetail.TransactionType == TransactionType.Receipt &&
                await IsDuplicateEntryAsync(transactionDetail.ItemId, padNumber, transactionDetail.Prefix, transactionDetail.IsPlate, transactionDetail.PlateRegionId, transactionDetail.MajorId, transactionDetail.MinorId))
            {
                return false;
            }

            if ((transactionDetail.TransactionType == TransactionType.Issue || transactionDetail.TransactionType == TransactionType.Damaged) &&
                !await CanIssueTransactionAsync(transactionDetail.ItemId, padNumber, transactionDetail.Prefix, transactionDetail.IsPlate, transactionDetail.PlateRegionId, transactionDetail.MajorId, transactionDetail.MinorId))
            {
                return false;
            }

            if (transactionDetail.TransactionType == TransactionType.Receipt &&
                !await CanReceiveTransactionAsync(transactionDetail.ItemId, padNumber, transactionDetail.Prefix, transactionDetail.IsPlate, transactionDetail.PlateRegionId, transactionDetail.MajorId, transactionDetail.MinorId))
            {
                return false;
            }

            if (transactionDetail.TransactionType == TransactionType.Return &&
                !await CanReturnTransactionAsync(transactionDetail.ItemId, padNumber, transactionDetail.Prefix, transactionDetail.IsPlate, transactionDetail.PlateRegionId, transactionDetail.MajorId, transactionDetail.MinorId))
            {
                return false;
            }

            return true;
        }



        public async Task<bool> IsDuplicateEntryAsync(int itemId, int padNumber, string? prefix, bool? IsPlate, int? PlateRegionId, int? MajorId, int? MinorId)
        {
            if ((bool)IsPlate)
            {
                return await _context.StockItemsDetail.AnyAsync(s => s.ItemId == itemId && s.PadNumber == padNumber && s.Prefix == prefix && s.PlateRegionId == PlateRegionId && s.MajorId == MajorId && s.MinorId == MinorId);
            }
            else
            {
                return await _context.StockItemsDetail.AnyAsync(s => s.ItemId == itemId && s.PadNumber == padNumber && s.Prefix == prefix);
            }
        }

        public async Task<bool> CanIssueTransactionAsync(int itemId, int padNumber, string? prefix, bool? isPlate, int? plateRegionId, int? majorId, int? minorId)
        {
            var transaction = await _context.StockItemsDetail
                .FirstOrDefaultAsync(s => s.ItemId == itemId && s.PadNumber == padNumber && s.Prefix == prefix);

            if (transaction == null)
            {
                return false;
            }

            // If it's a plate transaction, ensure the region, major, and minor IDs match
            if ((bool)isPlate)
            {
                return transaction.TransactionType == TransactionType.Receipt &&
                       transaction.PlateRegionId == plateRegionId &&
                       transaction.MajorId == majorId &&
                       transaction.MinorId == minorId;
            }
            else
            {
                return transaction.TransactionType == TransactionType.Receipt;
            }
        }


        public async Task<bool> CanReceiveTransactionAsync(int itemId, int padNumber, string? prefix, bool? isPlate, int? plateRegionId, int? majorId, int? minorId)
        {
            if ((bool)isPlate)
            {
                return !await _context.StockItemsDetail.AnyAsync(s => s.ItemId == itemId && s.PadNumber == padNumber &&
                                                                      s.Prefix == prefix && s.PlateRegionId == plateRegionId && s.MajorId == majorId && s.MinorId == minorId);
            }
            else
            {
                return !await _context.StockItemsDetail.AnyAsync(s => s.ItemId == itemId && s.PadNumber == padNumber && s.Prefix == prefix);
            }
        }



        public async Task<bool> CanReturnTransactionAsync(int itemId, int padNumber, string? prefix, bool? isPlate, int? plateRegionId, int? majorId, int? minorId)
        {
            var transaction = await _context.StockItemsDetail
                .FirstOrDefaultAsync(s => s.ItemId == itemId && s.PadNumber == padNumber && s.Prefix == prefix);

            if (transaction == null)
            {
                return false;
            }

            // If it's a plate transaction, ensure the region, major, and minor IDs match
            if ((bool)isPlate)
            {
                return transaction.TransactionType == TransactionType.Issue &&
                       transaction.PlateRegionId == plateRegionId &&
                       transaction.MajorId == majorId &&
                       transaction.MinorId == minorId;
            }
            else
            {
                return transaction.TransactionType == TransactionType.Issue;
            }
        }



        public async Task BulkInsertTransactionsAsync(StockTransaction transaction)
        {

            var transactionDetails = new List<StockItemsDetail>();
            var platePoolItems = new List<PlatePool>();

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
                    TransactionDate = transaction.TransactionDate,
                    IsPlate = transaction.IsPlate,
                    MajorId = transaction.MajorId,
                    MinorId = transaction.MinorId,
                    PlateSizeId = transaction.PlateSizeId,
                    VehicleCategoryId = transaction.VehicleCategoryId,
                    PlateRegionId = transaction.PlateRegionId,
                    Prefix = transaction.Prefix,
                    ItemTypeCode = transaction.ItemTypeCode,
                });

                if ((bool)transaction.IsPlate)
                {
                    platePoolItems.Add(new PlatePool
                    {
                        PlateNumber = transaction.Prefix + padNumber,
                        AssignStatus = 1,
                        MajorId = transaction.MajorId ?? 0,  
                        MinorId = transaction.MinorId ?? 0,  
                        PlateSizeId = transaction.PlateSizeId ?? 0,  
                        VehicleCategoryId = transaction.VehicleCategoryId ?? 1,  
                        PlateRegionId = transaction.PlateRegionId ?? 0, 
                        IsDeleted = false,
                        IsActive = true
                    });
                }

            }

            await _context.StockItemsDetail.AddRangeAsync(transactionDetails);
            if ((bool)transaction.IsPlate)
                await _context.PlatePools.AddRangeAsync(platePoolItems);
            await _context.StockTransactions.AddAsync(transaction);
            await _context.SaveChangesAsync();

            await UpdateStockAsync(transaction.ItemId, transaction.StoreId, transaction.TransactionType != TransactionType.Return ? transaction.Quantity : -transaction.Quantity);
        }

        public async Task SingleInsertTransactionsAsync(StockTransaction transaction)
        {
            var transactionDetail = new StockItemsDetail
            {
                ItemId = transaction.ItemId,
                StoreId = transaction.StoreId,
                UserId = transaction.UserId,
                StoreKeeperId = transaction.StoreKeeperId,
                TransactionType = transaction.TransactionType,
                PadNumber = transaction.PadNumberStart,
                TransactionDate = transaction.TransactionDate,
                Prefix = transaction.Prefix,
                ItemTypeCode = transaction.ItemTypeCode
            };


            // Add the transactionDetail and transaction to their respective tables
            await _context.StockItemsDetail.AddAsync(transactionDetail);
            await _context.StockTransactions.AddAsync(transaction);
            await _context.SaveChangesAsync();

            // Update the stock quantity
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

        public async Task SingleUpdateItemDetailsTransactionAsync(StockTransaction transaction)
        {
            var transactionToUpdate = await _context.StockItemsDetail
                .FirstOrDefaultAsync(t => t.PadNumber == transaction.PadNumberStart && t.StoreId == transaction.StoreId && t.ItemId == transaction.ItemId);

            if (transactionToUpdate != null)
            {
                if (transaction.TransactionType == TransactionType.Return)
                {
                    transactionToUpdate.TransactionType = TransactionType.Receipt;
                }
                else
                {
                    transactionToUpdate.TransactionType = transaction.TransactionType;
                }

                _context.StockItemsDetail.Update(transactionToUpdate);
            }

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

        public async Task<ApiResult<StockItemsDetailDto>> GetStockItemsDetailAsync(int storeId, int itemId, int pageIndex, int pageSize, string? sortColumn = null, string? sortOrder = null, string? filterColumn = null, string? filterQuery = null)
        {
            return await _repository.GetStockItemsDetailAsync(storeId, itemId, pageIndex, pageSize, sortColumn, sortOrder, filterColumn, filterQuery);
        }



        public async Task<IEnumerable<StockItemsDetail>> GetAllStockItemsDetailsAsync()
        {
            return await _repository.GetAllAsync();
        }

        public async Task<IEnumerable<StockItemsDetail>> GetStockItemsDetailsByStoreIdAsync(int storeId)
        {
            return await _repository.GetByStoreIdAsync(storeId);
        }

        public async Task<IEnumerable<StockItemsDetail>> GetStockItemsDetailsByTransactionTypeAsync(string transactionType)
        {
            return await _repository.GetByTransactionTypeAsync(transactionType);
        }

        public async Task<string> GetLeastPadNumberWithPrefixAsync(ItemTypeEnum itemCode, int userId)
        {
            
            var stockItemDetail = await _context.StockItemsDetail
                .Where(s => s.ItemTypeCode == itemCode && s.UserId == userId && s.TransactionType == TransactionType.Receipt)
                .OrderBy(s => s.PadNumber)
                .FirstOrDefaultAsync();

            if (stockItemDetail == null)
                throw new Exception("No stock item found for the provided criteria.");

            // Concatenate Prefix and PadNumber
            return ($"{(stockItemDetail.Prefix).Trim()}{stockItemDetail.PadNumber}").Trim();
        }

        public async Task<string> GetLeastPlateNumberWithPrefixAsync(ItemTypeEnum itemCode, int userId, int plateRegionId,
            int? majorId, int? minorId, int? plateSizeId, int? vehicleCategoryId)
        {
            var stockItemDetail = await _context.StockItemsDetail
                .Where(s => s.ItemTypeCode == itemCode &&
                            s.UserId == userId &&
                            s.TransactionType == TransactionType.Receipt &&
                            s.PlateRegionId == plateRegionId &&
                            (!majorId.HasValue || s.MajorId == majorId) &&
                            (!minorId.HasValue || s.MinorId == minorId) &&
                            (!plateSizeId.HasValue || s.PlateSizeId == plateSizeId) &&
                            (!vehicleCategoryId.HasValue || s.VehicleCategoryId == vehicleCategoryId))
                .OrderBy(s => s.PadNumber)
                .FirstOrDefaultAsync();

            if (stockItemDetail == null)
                throw new Exception("No matching plate number found with the provided criteria.");

            return $"{(stockItemDetail.Prefix).Trim()}{stockItemDetail.PadNumber}";
        }


        public async Task<bool> UpdateTransactionTypeAsync(ItemTypeEnum itemCode, int userId, string newTransactionType)
        {
            // Find the record to update
            var stockItemDetail = await _context.StockItemsDetail
                .FirstOrDefaultAsync(s => s.ItemTypeCode == itemCode && s.UserId == userId);

            if (stockItemDetail == null)
                throw new Exception("Stock item not found for the provided ItemId and UserId.");

            // Update the transaction type
            stockItemDetail.TransactionType = newTransactionType;

            // Save changes to the database
            _context.StockItemsDetail.Update(stockItemDetail);
            await _context.SaveChangesAsync();

            return true;
        }

        public async Task<bool> CheckAndUpdateByPrefixAndPadNumberAsync(ItemTypeEnum itemcCode, string prefixAndPadNumber, string newTransactionType)
        {
            // Split the string to get Prefix and PadNumber
            var prefix = new string(prefixAndPadNumber.TakeWhile(char.IsLetter).ToArray());
            var padNumberPart = new string(prefixAndPadNumber.SkipWhile(char.IsLetter).ToArray());

            if (!int.TryParse(padNumberPart, out int padNumber))
            {
                throw new ArgumentException("Invalid PadNumber part in the input.");
            }

            // Find the record based on Prefix and PadNumber
            var stockItemDetail = await _context.StockItemsDetail
                .FirstOrDefaultAsync(s => s.Prefix == prefix && s.PadNumber == padNumber && s.ItemTypeCode == itemcCode);

            if (stockItemDetail == null)
            {
                return false; // Entry doesn't exist
            }

            // Update the transaction type
            stockItemDetail.TransactionType = newTransactionType;
            _context.StockItemsDetail.Update(stockItemDetail);
            await _context.SaveChangesAsync();

            return true;
        }


    }
}
