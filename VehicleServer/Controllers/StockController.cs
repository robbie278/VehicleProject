using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using VehicleServer.DTOs;
using VehicleServer.Repository;

namespace VehicleServer.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class StockController
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
        public async Task<ActionResult<IEnumerable<StockDto>>> GetStocks()
        {
            return await _StockRepo.GetStocks();
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