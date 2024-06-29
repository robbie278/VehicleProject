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
            _context = context;
        }
     

        public async Task<ActionResult<ApiResult<StoreKeeperDto>>> GetStoreKeepers(
              int pageIndex = 0,
              int pageSize = 10,
              string? sortColumn = null,
              string? sortOrder = null,
              string? filterColumn = null,
              string? filterQuery = null)
        {

            return await ApiResult<StoreKeeperDto>.CreateAsync(
                    _context.StoreKeepers.AsNoTracking().Where(ct => ct.IsDeleted != true).Select(c => new StoreKeeperDto()
                    {
                        StoreKeeperId = c.StoreKeeperId,
                        Name = c.Name,
                        Email = c.Email,
                        StoreId = c.Store!.StoreId,
                        StoreName = c.Store!.Name,
                    }),
                    pageIndex,
                    pageSize,
                    sortColumn,
                    sortOrder,
                    filterColumn,
                    filterQuery);


        }


        public async Task<ActionResult<StoreKeeper>> GetStoreKeeper(int id)
        {
            var storeKeeper = await _context.StoreKeepers.FindAsync(id);

            if (storeKeeper == null)
            {
                throw new Exception("No Data Found!");
            }

            return storeKeeper;
        }

       
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

       
        public async Task<ActionResult<StoreKeeperDto>> PostStoreKeeper(StoreKeeperDto storeKeeperDTO)
        {
            var storeKeeper = _mapper.Map<StoreKeeper>(storeKeeperDTO);

            _context.StoreKeepers.Add(storeKeeper);
            await _context.SaveChangesAsync();

            return _mapper.Map<StoreKeeperDto>(storeKeeper);
        }

       
        public async Task<ActionResult<int>> DeleteStoreKeeper(int id)
        {
            var storeKeeper = await _context.StoreKeepers.FindAsync(id);
            if (storeKeeper == null)
            {
                throw new Exception("No Data Found!");
            }
            storeKeeper.IsDeleted = true;
            _context.Entry(storeKeeper).State = EntityState.Modified;
            return await _context.SaveChangesAsync();
            
        }

        private bool StoreKeeperExists(int id)
        {
            return _context.StoreKeepers.Any(e => e.StoreKeeperId == id);
        }

        public bool isDupeStoreKeeper(StoreKeeperDto storeKeeper)
        {
            return _context.StoreKeepers.AsNoTracking().Any(
                 e => e.Name == storeKeeper.Name
                && e.Email == storeKeeper.Email
                && e.StoreId == storeKeeper.StoreId           
                && e.StoreKeeperId != storeKeeper.StoreKeeperId
                );
        }
    }
}