
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using VehicleServer.DTOs;
using VehicleServer.Entities;

namespace VehicleServer.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
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
        public async Task<ActionResult<IEnumerable<StoreKeeperDTO>>> GetStoreKeepers()
        {
            return await _context.StoreKeepers.
                ProjectTo<StoreKeeperDTO>(_mapper.ConfigurationProvider).ToListAsync();
        }

        // GET: api/StoreKeepers/5
        [HttpGet("{id}")]
        public async Task<ActionResult<StoreKeeper>> GetStoreKeeper(int id)
        {
            var storeKeeper = await _context.StoreKeepers.FindAsync(id);

            if (storeKeeper == null)
            {
                return NotFound();
            }

            return storeKeeper;
        }

        // PUT: api/StoreKeepers/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutStoreKeeper(int id, StoreKeeper storeKeeper)
        {
            if (id != storeKeeper.StoreKeeperId)
            {
                return BadRequest();
            }

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
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<StoreKeeperDTO>> PostStoreKeeper(StoreKeeperDTO storeKeeperDTO)
        {
            var storeKeeper = _mapper.Map<StoreKeeper>(storeKeeperDTO);

            _context.StoreKeepers.Add(storeKeeper);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetStoreKeeper", new { id = storeKeeper.StoreKeeperId }, storeKeeper);
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
