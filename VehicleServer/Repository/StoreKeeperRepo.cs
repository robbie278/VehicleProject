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
        public async Task<ActionResult<IEnumerable<StoreKeeperDto>>> GetStoreKeepers()
        {
            return await _context.StoreKeepers.
                ProjectTo<StoreKeeperDto>(_mapper.ConfigurationProvider).ToListAsync();
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

       
        public async Task<IActionResult> PutStoreKeeper(int id, StoreKeeperDto storeKeeper)
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

       
        public async Task<ActionResult<bool>> DeleteStoreKeeper(int id)
        {
            var storeKeeper = await _context.StoreKeepers.FindAsync(id);
            if (storeKeeper == null)
            {
                throw new Exception("No Data Found!");
            }

            _context.StoreKeepers.Remove(storeKeeper);
             await _context.SaveChangesAsync();
            return true;
        }

        private bool StoreKeeperExists(int id)
        {
            return _context.StoreKeepers.Any(e => e.StoreKeeperId == id);
        }
    }
}
