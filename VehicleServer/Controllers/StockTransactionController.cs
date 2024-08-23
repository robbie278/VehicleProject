using Microsoft.AspNetCore.Mvc;
using VehicleServer.DTOs;
using VehicleServer.Entities;
using VehicleServer.Enums;
using VehicleServer.Repository;
using VehicleServer.Services;
using VehicleServer.Services.StockTransactionDetailServices;
using System.Threading.Tasks;

namespace VehicleServer.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class StockTransactionController : ControllerBase
    {
        private readonly StockService _stockService;
        private readonly TransactionRepo _stockTransactionRepo;
        private readonly IStockItemsDetailService _stockTransactionDetailService;

        public StockTransactionController(
            StockService stockService,
            TransactionRepo stockTransactionRepo,
            IStockItemsDetailService stockTransactionDetailService)
        {
            _stockService = stockService;
            _stockTransactionRepo = stockTransactionRepo;
            _stockTransactionDetailService = stockTransactionDetailService;
        }

        [HttpGet]
        public async Task<ActionResult<ApiResult<StockTransactionDto>>> GetStockTransactions(
            int pageIndex = 0,
            int pageSize = 10,
            string? sortColumn = null,
            string? sortOrder = null,
            string? filterColumn = null,
            string? filterQuery = null,
            string? transactionTypes = null,
            int? itemId = null,
            int? storeId = null)
        {
            return await _stockTransactionRepo.GetStockTransactions(pageIndex, pageSize, sortColumn, sortOrder, filterColumn, filterQuery, transactionTypes, storeId, itemId);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<StockTransactionDto>> GetStockTransaction(int id)
        {
            return await _stockTransactionRepo.GetStockTransaction(id);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> PutStockTransaction(int id, StockTransaction request)
        {
            var existingTransaction = await _stockTransactionRepo.GetStockTransactionEntity(id);
            if (existingTransaction == null) return NotFound("Transaction not found.");

            UpdateTransactionDetails(existingTransaction, request);

            if (!await ValidateTransactionAsync(existingTransaction))
                return BadRequest("Validation failed.");

            return await HandleTransactionTypeAsync(existingTransaction);
        }

        [HttpPost]
        public async Task<IActionResult> PostStockTransaction(StockTransaction request)
        {
            if (request.TransactionType == TransactionType.Issue &&
                !await _stockService.CanIssueTransactionAsync(request.ItemId, request.StoreId, request.Quantity))
            {
                return BadRequest("Not enough Stock!");
            }

            if (!await ValidateTransactionAsync(request))
                return BadRequest("Validation failed.");

            return await HandleTransactionTypeAsync(request);
        }

        [HttpPost]
        [Route("single")]
        public async Task<IActionResult> PostSingleStockTransaction(StockTransaction request)
        {
            if (request.TransactionType == TransactionType.Issue &&
                !await _stockService.CanIssueTransactionAsync(request.ItemId, request.StoreId, request.Quantity))
            {
                return BadRequest("Not enough Stock!");
            }

            if (!await ValidateSingleTransactionAsync(request))
                return BadRequest("Validation failed.");

            return await HandleSingleTransactionTypeAsync(request);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteStockTransaction(int id)
        {
            var result = await _stockTransactionRepo.DeleteStockTransaction(id);
            if (result == null) return BadRequest("Deletion failed.");

            return Ok(result);
        }

        // Helper methods
        private void UpdateTransactionDetails(StockTransaction existingTransaction, StockTransaction request)
        {
            existingTransaction.ItemId = request.ItemId;
            existingTransaction.StoreId = request.StoreId;
            existingTransaction.UserId = request.UserId;
            existingTransaction.StoreKeeperId = request.StoreKeeperId;
            existingTransaction.TransactionType = request.TransactionType;
            existingTransaction.Quantity = request.Quantity;
            existingTransaction.PadNumberStart = request.PadNumberStart;
            existingTransaction.PadNumberEnd = request.PadNumberEnd;
            existingTransaction.TransactionDate = request.TransactionDate;
            existingTransaction.IsPlate = request.IsPlate;
            existingTransaction.MajorId = request.MajorId;
            existingTransaction.MinorId = request.MinorId;
            existingTransaction.PlateSizeId = request.PlateSizeId;
            existingTransaction.VehicleCategoryId = request.VehicleCategoryId;
            existingTransaction.PlateRegionId = request.PlateRegionId;
        }

        private async Task<bool> ValidateTransactionAsync(StockTransaction transaction)
        {
            return await _stockTransactionDetailService.ValidateTransactionAsync(new StockItemsDetail
            {
                ItemId = transaction.ItemId,
                StoreId = transaction.StoreId,
                UserId = transaction.UserId,
                StoreKeeperId = transaction.StoreKeeperId,
                TransactionType = transaction.TransactionType,
                IsPlate = transaction.IsPlate,
                PlateRegionId = transaction.PlateRegionId,
                MajorId = transaction.MajorId,
                MinorId = transaction.MinorId,
                PlateSizeId = transaction.PlateSizeId,
                VehicleCategoryId = transaction.VehicleCategoryId,
                Prefix = transaction.Prefix
            }, transaction.PadNumberStart, transaction.PadNumberEnd ?? default(int));
        }

        private async Task<bool> ValidateSingleTransactionAsync(StockTransaction transaction)
        {
            return await _stockTransactionDetailService.ValidateSingleTransactionAsync(new StockItemsDetail
            {
                ItemId = transaction.ItemId,
                StoreId = transaction.StoreId,
                UserId = transaction.UserId,
                StoreKeeperId = transaction.StoreKeeperId,
                TransactionType = transaction.TransactionType,
                IsPlate = transaction.IsPlate,
                PlateRegionId = transaction.PlateRegionId,
                MajorId = transaction.MajorId,
                MinorId = transaction.MinorId,
                PlateSizeId = transaction.PlateSizeId,
                VehicleCategoryId = transaction.VehicleCategoryId,
                Prefix = transaction.Prefix

            }, transaction.PadNumberStart);
        }

        private async Task<IActionResult> HandleTransactionTypeAsync(StockTransaction transaction)
        {
            switch (transaction.TransactionType)
            {
                case TransactionType.Receipt:
                    await _stockTransactionDetailService.BulkInsertTransactionsAsync(transaction);
                    return Ok("Bulk insertion and stock update successful.");
                case TransactionType.Issue:
                case TransactionType.Damaged:
                case TransactionType.Return:
                    await _stockTransactionDetailService.BulkUpdateItemDetailsTransactionAsync(transaction);
                    return Ok($"{transaction.TransactionType} and stock update successful.");
                default:
                    return BadRequest("Invalid transaction type.");
            }
        }

        private async Task<IActionResult> HandleSingleTransactionTypeAsync(StockTransaction transaction)
        {
            switch (transaction.TransactionType)
            {
                case TransactionType.Receipt:
                    await _stockTransactionDetailService.SingleInsertTransactionsAsync(transaction);
                    return Ok("Transaction insertion and stock update successful.");
                case TransactionType.Issue:
                case TransactionType.Damaged:
                case TransactionType.Return:
                    await _stockTransactionDetailService.SingleUpdateItemDetailsTransactionAsync(transaction);
                    return Ok($"{transaction.TransactionType} and stock update successful.");
                default:
                    return BadRequest("Invalid transaction type.");
            }
        }
    }
}
