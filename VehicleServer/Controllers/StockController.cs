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
    public class StockController : ControllerBase
    {
        private readonly ApplicationContext _context;
        private readonly IMapper _mapper;
        private readonly StockRepo _StockRepo;

        public StockController(ApplicationContext context, IMapper mapper, StockRepo StockRepo)
        {
            _context = context;
            _mapper = mapper;
            this._StockRepo = StockRepo;
        }
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Stock>>> GetStocks()
        {
            var stockReport = await _StockRepo.GetStocks();
            return Ok(stockReport);
        }


        // GET: api/Stock/5
        [HttpGet("{id}")]
        public async Task<ActionResult<StockDto>> GetStock(int id)
        {
            return await _StockRepo.GetStock(id);
        }

        // PUT: api/Stock/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutStock(int id, StockDto StockDto)
        {
            return await _StockRepo.PutStock(id, StockDto);
        }

        // POST: api/Stock
        [HttpPost]
        public async Task<ActionResult<StockDto>> PostStock(StockDto StockDto)
        {
            return await _StockRepo.PostStock(StockDto);
        }

        // DELETE: api/Stock/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteStock(int id)
        {
            return await _StockRepo.DeleteStock(id);
        }
    }
}