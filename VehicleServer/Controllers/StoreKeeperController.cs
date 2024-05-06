using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using VehicleServer.DTOs;
using VehicleServer.Entities;

namespace VehicleServer.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class StoreKeepersController : ControllerBase
    {
        private readonly ApplicationContext _context;
        private readonly IMapper _mapper;

        public StoreKeepersController(ApplicationContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        // GET: api/StoreKeepers
        [HttpGet]
        public async Task<ActionResult<IEnumerable<StoreKeeperDto>>> GetStoreKeepers()
        {
            var storeKeepers = await _context.StoreKeepers.ToListAsync();
            return Ok(_mapper.Map<IEnumerable<StoreKeeperDto>>(storeKeepers));
        }

        // GET: api/StoreKeepers/5
        [HttpGet("{id}")]
        public async Task<ActionResult<StoreKeeperDto>> GetStoreKeeper(int id)
        {
            var storeKeeper = await _context.StoreKeepers.FindAsync(id);

            if (storeKeeper == null)
            {
                return NotFound();
            }

            return _mapper.Map<StoreKeeperDto>(storeKeeper);
        }

        // PUT: api/StoreKeepers/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutStoreKeeper(int id, StoreKeeperDto storeKeeperDto)
        {
            if (id != storeKeeperDto.StoreKeeperId)
            {
                return BadRequest();
            }

            var storeKeeper = _mapper.Map<StoreKeeper>(storeKeeperDto);
            _context.Entry(storeKeeper).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!StoreKeeperExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/StoreKeepers
        [HttpPost]
        public async Task<ActionResult<StoreKeeperDto>> PostStoreKeeper(StoreKeeperDto storeKeeperDto)
        {
            var storeKeeper = _mapper.Map<StoreKeeper>(storeKeeperDto);
            _context.StoreKeepers.Add(storeKeeper);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetStoreKeeper", new { id = storeKeeper.StoreKeeperId }, _mapper.Map<StoreKeeperDto>(storeKeeper));
        }

        // DELETE: api/StoreKeepers/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteStoreKeeper(int id)
        {
            var storeKeeper = await _context.StoreKeepers.FindAsync(id);
            if (storeKeeper == null)
            {
                return NotFound();
            }

            _context.StoreKeepers.Remove(storeKeeper);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool StoreKeeperExists(int id)
        {
            return _context.StoreKeepers.Any(e => e.StoreKeeperId == id);
        }
    }
}