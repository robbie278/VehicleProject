using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using VehicleServer.DTOs;
using VehicleServer.Repository;

namespace VehicleServer.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class StockTransactionController
    {
        private readonly ApplicationContext _context;
        private readonly IMapper _mapper;
        private readonly TransactionRepo _StockTransactionRepo;

        public StockTransactionController(ApplicationContext context, IMapper mapper, TransactionRepo StockTransactionRepo)
        {
            _context = context;
            _mapper = mapper;
            this._StockTransactionRepo = StockTransactionRepo;
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
        public async Task<ActionResult<StockTransactionDto>> PostStockTransaction(StockTransactionDto StockTransactionDto)
        {
            return await _StockTransactionRepo.PostStockTransaction(StockTransactionDto);
        }

        // DELETE: api/StockTransaction/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteStockTransaction(int id)
        {
            return await _StockTransactionRepo.DeleteStockTransaction(id);
        }
    }
}
