
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using VehicleServer.DTOs;
using VehicleServer.Entities;
using VehicleServer.Repository;

namespace VehicleServer.Controllers
{
    [ApiController]
    [Route("api/[controller]")]

    public class StoreKeepersController : ControllerBase
    {
        private readonly ApplicationContext _context;
        private readonly IMapper _mapper;
        private readonly StoreKeeperRepo _storeKeeperRepo;

        public StoreKeepersController(ApplicationContext context, IMapper mapper, StoreKeeperRepo storeKeeperRepo)
        {
            _context = context;
            _mapper = mapper;
            this._storeKeeperRepo = storeKeeperRepo;
        }

        // GET: api/StoreKeepers
        [HttpGet]
        public async Task<ActionResult<IEnumerable<StoreKeeperDto>>> GetStoreKeepers()
        {
            return await _storeKeeperRepo.GetStoreKeepers();
        }

        // GET: api/StoreKeepers/5
        [HttpGet("{id}")]
        public async Task<ActionResult<StoreKeeper>> GetStoreKeeper(int id)
        {
            return await _storeKeeperRepo.GetStoreKeeper(id);
        }

        // PUT: api/StoreKeepers/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutStoreKeeper(int id, StoreKeeperDto storeKeeper)
        {
            return await _storeKeeperRepo.PutStoreKeeper(id, storeKeeper);

        }

        // POST: api/StoreKeepers
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<StoreKeeperDto>> PostStoreKeeper(StoreKeeperDto storeKeeperDTO)
        {
            return await _storeKeeperRepo.PostStoreKeeper(storeKeeperDTO);
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<bool>> DeleteStoreKeeper(int id)
        {
            return await _storeKeeperRepo.DeleteStoreKeeper(id);
        }
    }
}