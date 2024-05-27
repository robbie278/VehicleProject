using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using VehicleServer.DTOs;
using VehicleServer.Entities;

namespace VehicleServer.Repository
{
    public class StoreRepo
    {
        private readonly ApplicationContext _context;
        private readonly IMapper _mapper;

        public StoreRepo(ApplicationContext context, IMapper mapper)
        {
            this._context = context;
            this._mapper = mapper;
        }

        public async Task<ActionResult<IEnumerable<StoreDto>>> GetStores()
        {
            var stores = await _context.Stores.ToListAsync();

            var storeDtos = _mapper.Map<List<StoreDto>>(stores);

            return storeDtos;
        }




        // GET: api/Store/5
        [HttpGet("{id}")]
        public async Task<ActionResult<StoreDto>> GetStore(int id)
        {
            var store = await _context.Stores.FindAsync(id);

            if (store == null)
            {
                throw new Exception("No Data Found!");
            }

            return _mapper.Map<StoreDto>(store);
        }

        // PUT: api/Store/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutStore(int id, StoreDto storeDto)
        {
            if (id != storeDto.StoreId)
            {
                 throw new Exception("No id!");
            }

            var store = _mapper.Map<Store>(storeDto);
            _context.Entry(store).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!StoreExists(id))
                {
                    throw new Exception("The Id Not Correct!");
                }
                else
                {
                    throw;
                }
            }

            return null;
        }

        // POST: api/Store
        [HttpPost]
        public async Task<ActionResult<StoreDto>> PostStore(StoreDto storeDto)
        {
            var store = _mapper.Map<Store>(storeDto);
            var result = _context.Stores.Add(store);
            await _context.SaveChangesAsync();

            //return CreatedAtAction("GetStore", new { id = store.StoreId }, _mapper.Map<StoreDto>(store));
            return _mapper.Map<StoreDto>(store);
        }

        // DELETE: api/Store/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteStore(int id)
        {
            var store = await _context.Stores.FindAsync(id);
            if (store == null)
            {
                 throw new Exception("Id Not found!");
            }

            _context.Stores.Remove(store);
            await _context.SaveChangesAsync();

            return null;
        }

        private bool StoreExists(int id)
        {
            return _context.Stores.Any(e => e.StoreId == id);
        }
    }
}

