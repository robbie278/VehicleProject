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

        //public async Task<ActionResult<IEnumerable<StoreDto>>> GetStores()
        //{
        //    var stores = await _context.Stores.ToListAsync();

        //    var storeDtos = _mapper.Map<List<StoreDto>>(stores);

        //    return storeDtos;
        //}
        //----------------
        public async Task<ActionResult<ApiResult<StoreDto>>> GetStores(
                int pageIndex = 0,
                int pageSize = 10,
                string? sortColumn = null,
                string? sortOrder = null,
                string? filterColumn = null,
                string? filterQuery = null)
        {

            return await ApiResult<StoreDto>.CreateAsync(
                    _context.Stores.AsNoTracking().Select(s => new StoreDto()
                    {
                        StoreId = s.StoreId,
                        Name = s.Name,
                        address = s.Address,
                    }),
                    pageIndex,
                    pageSize,
                    sortColumn,
                    sortOrder,
                    filterColumn,
                    filterQuery);


        }


        //----------------





        public async Task<ActionResult<StoreDto>> GetStore(int id)
        {
            var store = await _context.Stores.FindAsync(id);

            if (store == null)
            {
                throw new Exception("No Data Found!");
            }

            return _mapper.Map<StoreDto>(store);
        }

     
        
        public async Task<ActionResult<Boolean>> PutStore(int id, StoreDto storeDto)
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

            return true;
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
        public async Task<ActionResult<int>> DeleteStore(int id)
        {
            var store = await _context.Stores.FindAsync(id);
            if (store == null)
            {
                 throw new Exception("Id Not found!");
            }

            _context.Stores.Remove(store);
            return await _context.SaveChangesAsync();

            
        }

        private bool StoreExists(int id)
        {
            return _context.Stores.Any(e => e.StoreId == id);
        }

        public bool isDupeStore(StoreDto store)
        {
            return _context.Stores.AsNoTracking().Any(
                 e => e.Name == store.Name
             && e.Address == store.address
             && e.StoreId != store.StoreId
                );
        }
    }
}

