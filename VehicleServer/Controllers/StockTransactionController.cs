using AutoMapper;
using Azure.Core;
using Microsoft.AspNetCore.Mvc;
using VehicleServer.DTOs;
using VehicleServer.Entities;
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
        public async Task<ActionResult<IEnumerable<StockTransactionDto>>> GetStockTransactions()
        {
            return await _StockTransactionRepo.GetStockTransactions();
        }


        // GET: api/StockTransaction/5
        [HttpGet("{id}")]
        public async Task<ActionResult<StockTransactionDto>> GetStockTransaction(int id)
        {
            return await _StockTransactionRepo.GetStockTransaction(id);
        }

        // PUT: api/StockTransaction/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutStockTransaction(int id, StockTransactionDto StockTransactionDto)
        {
            return await _StockTransactionRepo.PutStockTransaction(id, StockTransactionDto);
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
            }, request.PadNumberStart, request.PadNumberEnd);

            if (!isValid)
            {
                return BadRequest("Validation failed.");
            }

            if (transaction.TransactionType == "Receipt")
            {
                await _stockTransactionDetailService.BulkInsertTransactionsAsync(transaction);
                return Ok("Bulk insertion and stock update successful.");
            }

            else if (transaction.TransactionType == "Issue")
            {
                await _stockTransactionDetailService.BulkUpdateItemDetailsTransactionAsync(transaction);
                return Ok("Bulk Issue and stock update successful.");

            }
            else
            {
                return BadRequest("Something went wrong");
            }


        }

        // DELETE: api/StockTransaction/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteStockTransaction(int id)
        {
            return await _StockTransactionRepo.DeleteStockTransaction(id);
        }
    }
}
