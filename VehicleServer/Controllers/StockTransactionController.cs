using AutoMapper;
using Azure.Core;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using VehicleServer.DTOs;
using VehicleServer.Entities;
using VehicleServer.Enums;
using VehicleServer.Repository;
using VehicleServer.Services;
using VehicleServer.Services.StockTransactionDetailServices;

namespace VehicleServer.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class StockTransactionController : ControllerBase
    {
        private readonly StockService _stockService;
        private readonly TransactionRepo _StockTransactionRepo;
        private readonly IStockItemsDetailService _stockTransactionDetailService;

        public StockTransactionController(StockService stockService, TransactionRepo StockTransactionRepo, IStockItemsDetailService stockTransactionDetailService)
        {
            _stockService = stockService;
            _StockTransactionRepo = StockTransactionRepo;
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
        string? transactionType = null)
        {
            return await _StockTransactionRepo.GetStockTransactions(pageIndex, pageSize, sortColumn, sortOrder, filterColumn, filterQuery, transactionType);
        }


        // GET: api/StockTransaction/5
        [HttpGet("{id}")]
        public async Task<ActionResult<StockTransactionDto>> GetStockTransaction(int id)
        {
            return await _StockTransactionRepo.GetStockTransaction(id);
        }

        // PUT: api/StockTransaction/5
        [HttpPut("{id}")]
        public async Task<ActionResult<bool>> PutStockTransaction(int id, StockTransaction request)
        {
            // Fetch the existing transaction
            var existingTransaction = await _StockTransactionRepo.GetStockTransactionEntity(id);
            if (existingTransaction == null)
            {
                return NotFound("Transaction not found.");
            }

            // Update existing transaction details
            existingTransaction.ItemId = request.ItemId;
            existingTransaction.StoreId = request.StoreId;
            existingTransaction.UserId = request.UserId;
            existingTransaction.StoreKeeperId = request.StoreKeeperId;
            existingTransaction.TransactionType = request.TransactionType;
            existingTransaction.Quantity = request.Quantity;
            existingTransaction.PadNumberStart = request.PadNumberStart;
            existingTransaction.PadNumberEnd = request.PadNumberEnd;
            existingTransaction.TransactionDate = request.TransactionDate;

            if (existingTransaction.TransactionType == TransactionType.Issue)
            {
                var canIssueTransaction = await _stockService.CanIssueTransactionAsync(existingTransaction.ItemId, existingTransaction.StoreId, existingTransaction.Quantity);
                if (!canIssueTransaction)
                {
                    return BadRequest("Not enough Stock!");
                }
            }

            var isValid = await _stockTransactionDetailService.ValidateTransactionAsync(new StockItemsDetail
            {
                ItemId = existingTransaction.ItemId,
                StoreId = existingTransaction.StoreId,
                UserId = existingTransaction.UserId,
                StoreKeeperId = existingTransaction.StoreKeeperId,
                TransactionType = existingTransaction.TransactionType
            }, existingTransaction.PadNumberStart, existingTransaction.PadNumberEnd ?? default(int));

            if (!isValid)
            {
                return BadRequest("Validation failed.");
            }

            if (existingTransaction.TransactionType == TransactionType.Receipt)
            {
                await _stockTransactionDetailService.BulkInsertTransactionsAsync(existingTransaction);
                return Ok("Bulk insertion and stock update successful.");
            }
            else if (existingTransaction.TransactionType == TransactionType.Issue)
            {
                await _stockTransactionDetailService.BulkUpdateItemDetailsTransactionAsync(existingTransaction);
                return Ok("Bulk Issue and stock update successful.");
            }
            else if (existingTransaction.TransactionType == TransactionType.Damaged)
            {
                await _stockTransactionDetailService.BulkUpdateItemDetailsTransactionAsync(existingTransaction);
                return Ok("Bulk Damage and stock update successful.");
            }
            else if (existingTransaction.TransactionType == TransactionType.Return)
            {
                await _stockTransactionDetailService.BulkUpdateItemDetailsTransactionAsync(existingTransaction);
                return Ok("Bulk Return and stock update successful.");
            }
            else
            {
                return BadRequest("Something went wrong");
            }
        }



        // POST: api/StockTransaction
        [HttpPost]
        public async Task<IActionResult> PostStockTransaction(StockTransaction request)
        {
            var transaction = new StockTransaction
            {
                ItemId = request.ItemId,
                StoreId = request.StoreId,
                UserId = request.UserId,
                StoreKeeperId = request.StoreKeeperId,
                TransactionType = request.TransactionType,
                Quantity = request.Quantity,
                PadNumberStart = request.PadNumberStart,
                PadNumberEnd = request.PadNumberEnd,
                TransactionDate = request.TransactionDate
            };
            if(transaction.TransactionType == "Issue")
            {
                var canIssueTransaction = await _stockService.CanIssueTransactionAsync(transaction.ItemId, transaction.StoreId, transaction.Quantity);
                if (!canIssueTransaction)
                {
                    return BadRequest("Not enough Stock!");
                }
            }

            var isValid = await _stockTransactionDetailService.ValidateTransactionAsync(new StockItemsDetail
            {
                ItemId = request.ItemId,
                StoreId = request.StoreId,
                UserId = request.UserId,
                StoreKeeperId = request.StoreKeeperId,
                TransactionType = request.TransactionType
            }, request.PadNumberStart, request.PadNumberEnd ?? default(int) );

            if (!isValid)
            {
                return BadRequest("Validation failed.");
            }

            if (transaction.TransactionType == TransactionType.Receipt)
            {
                await _stockTransactionDetailService.BulkInsertTransactionsAsync(transaction);
                return Ok("Bulk insertion and stock update successful.");
            }

            else if (transaction.TransactionType == TransactionType.Issue)
            {
                await _stockTransactionDetailService.BulkUpdateItemDetailsTransactionAsync(transaction);
                return Ok("Bulk Issue and stock update successful.");

            }
            else if(transaction.TransactionType == TransactionType.Damaged)
            {
                await _stockTransactionDetailService.BulkUpdateItemDetailsTransactionAsync(transaction);
                return Ok("Bulk Damage and stock update successful.");

            }   
            else if (transaction.TransactionType == TransactionType.Return)
            {
                await _stockTransactionDetailService.BulkUpdateItemDetailsTransactionAsync(transaction);
                return Ok("Bulk Return and stock update successful.");
            }
            else
            {
                return BadRequest("Something went wrong");
            }


        }

        [HttpPost]
        [Route("single")]
        public async Task<IActionResult> PostSingleStockTransaction(StockTransaction request)
        {
            var transaction = new StockTransaction
            {
                ItemId = request.ItemId,
                StoreId = request.StoreId,
                UserId = request.UserId,
                StoreKeeperId = request.StoreKeeperId,
                TransactionType = request.TransactionType,
                Quantity = request.Quantity,
                PadNumberStart = request.PadNumberStart,
                PadNumberEnd = request.PadNumberEnd,
                TransactionDate = request.TransactionDate
            };
            if (transaction.TransactionType == "Issue")
            {
                var canIssueTransaction = await _stockService.CanIssueTransactionAsync(transaction.ItemId, transaction.StoreId, transaction.Quantity);
                if (!canIssueTransaction)
                {
                    return BadRequest("Not enough Stock!");
                }
            }

            var isValid = await _stockTransactionDetailService.ValidateSingleTransactionAsync(new StockItemsDetail
            {
                ItemId = request.ItemId,
                StoreId = request.StoreId,
                UserId = request.UserId,
                StoreKeeperId = request.StoreKeeperId,
                TransactionType = request.TransactionType
            }, request.PadNumberStart);

            if (!isValid)
            {
                return BadRequest("Validation failed.");
            }

            if (transaction.TransactionType == TransactionType.Receipt)
            {
                await _stockTransactionDetailService.SingleInsertTransactionsAsync(transaction);
                return Ok("Transacion insertion and stock update successful.");
            }

            else if (transaction.TransactionType == TransactionType.Issue)
            {
                await _stockTransactionDetailService.SingleUpdateItemDetailsTransactionAsync(transaction);
                return Ok("Transacion Issue and stock update successful.");

            }
            else if (transaction.TransactionType == TransactionType.Damaged)
            {
                await _stockTransactionDetailService.SingleUpdateItemDetailsTransactionAsync(transaction);
                return Ok("Transacion Damage and stock update successful.");

            }
            else if (transaction.TransactionType == TransactionType.Return)
            {
                await _stockTransactionDetailService.SingleUpdateItemDetailsTransactionAsync(transaction);
                return Ok("Transacion Return and stock update successful.");
            }
            else
            {
                return BadRequest("Something went wrong");
            }


        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteStockTransaction(int id)
        {
            var result = await _StockTransactionRepo.DeleteStockTransaction(id);
            if (result == null)
            {
                return BadRequest(result);
            }
            return Ok(result);
        }


    }
}
