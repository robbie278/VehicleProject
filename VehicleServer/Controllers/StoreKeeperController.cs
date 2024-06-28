
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
       
        private readonly StoreKeeperRepo _storeKeeperRepo;

        public StoreKeepersController(StoreKeeperRepo storeKeeperRepo)
        {
            
            this._storeKeeperRepo = storeKeeperRepo;
        }

        // GET: api/StoreKeepers
         [HttpGet]
        public async Task<ActionResult<ApiResult<StoreKeeperDto>>> GetStoreKeepers(
                  int pageIndex = 0,
                  int pageSize = 10,
                  string? sortColumn = null,
                  string? sortOrder = null,
                  string? filterColumn = null,
                  string? filterQuery = null)
        {
            return await _storeKeeperRepo.GetStoreKeepers(pageIndex, pageSize, sortColumn, sortOrder, filterColumn, filterQuery);
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
        public async Task<IActionResult> PutStoreKeeper(int id, StoreKeeper storeKeeper)
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
            var result = await _storeKeeperRepo.DeleteStoreKeeper(id);
                if (result == null)
            {
                return BadRequest(result);
            }
                return Ok(result);
        }

        [HttpPost]
        [Route("isDupeStoreKeeper")]
        public bool isDupeStoreKeeper(StoreKeeperDto storeKeeper)
        {
            return _storeKeeperRepo.isDupeStoreKeeper(storeKeeper);
        }
    }
}