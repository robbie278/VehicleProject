using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using VehicleServer.DTOs;
using VehicleServer.Entities;
using VehicleServer.Repository;
using VehicleServer.Services;

namespace VehicleServer.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class StockTransactionController : ControllerBase
    {
        private readonly StockService _stockService;
        private readonly TransactionRepo _StockTransactionRepo;

        public StockTransactionController(StockService stockService, TransactionRepo StockTransactionRepo)
        {
            _stockService = stockService;
            _StockTransactionRepo = StockTransactionRepo;
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
        public async Task<IActionResult> PostStockTransaction(StockTransaction transaction)
        {
            await _stockService.HandleStockTransaction(transaction);
            return Ok();
        }

        // DELETE: api/StockTransaction/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteStockTransaction(int id)
        {
            return await _StockTransactionRepo.DeleteStockTransaction(id);
        }
    }
}
