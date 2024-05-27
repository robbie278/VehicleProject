using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using VehicleServer.DTOs;
using VehicleServer.Entities;
using AutoMapper.QueryableExtensions;

namespace VehicleServer.Repository
{
    public class StoreKeeperRepo
    {
        private readonly IMapper _mapper;
        private readonly ApplicationContext _context;

        public StoreKeeperRepo(IMapper mapper, ApplicationContext context)
        {
            _mapper = mapper;
            this._context = context;
        }
        public async Task<ActionResult<IEnumerable<StoreKeeperDto>>> GetStoreKeepers()
        {
            return await _context.StoreKeepers.
                ProjectTo<StoreKeeperDto>(_mapper.ConfigurationProvider).ToListAsync();
        }

        // GET: api/StoreKeepers/5
        [HttpGet("{id}")]
        public async Task<ActionResult<StoreKeeper>> GetStoreKeeper(int id)
        {
            var storeKeeper = await _context.StoreKeepers.FindAsync(id);

            if (storeKeeper == null)
            {
                throw new Exception("No Data Found!");
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
                throw new Exception("Id not found!");
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
                    throw new Exception("Id Not Found in Database!");
                }
                else
                {
                    throw;
                }
            }

            return null;
        }

        // POST: api/StoreKeepers
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<StoreKeeperDto>> PostStoreKeeper(StoreKeeperDto storeKeeperDTO)
        {
            var storeKeeper = _mapper.Map<StoreKeeper>(storeKeeperDTO);

            _context.StoreKeepers.Add(storeKeeper);
            await _context.SaveChangesAsync();

            return _mapper.Map<StoreKeeperDto>(storeKeeper);
        }

        // DELETE: api/StoreKeepers/5
        [HttpDelete("{id}")]
        public async Task<int> DeleteStoreKeeper(int id)
        {
            var storeKeeper = await _context.StoreKeepers.FindAsync(id);
            if (storeKeeper == null)
            {
                throw new Exception("No Data Found!");
            }

            _context.StoreKeepers.Remove(storeKeeper);
            var result = await _context.SaveChangesAsync();
            return result;
        }

        private bool StoreKeeperExists(int id)
        {
            return _context.StoreKeepers.Any(e => e.StoreKeeperId == id);
        }
    }
}
