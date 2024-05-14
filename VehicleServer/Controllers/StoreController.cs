using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using VehicleServer.DTOs;
using VehicleServer.Entities;
using VehicleServer;

[ApiController]
[Route("api/[controller]")]
 
public class StoreController : ControllerBase
{
    private readonly ApplicationContext _context;
    private readonly IMapper _mapper;

    public StoreController(ApplicationContext context, IMapper mapper)
    {
        _context = context;
        _mapper = mapper;
    }

    // GET: api/Store
    [HttpGet]
    public async Task<ActionResult<IEnumerable<StoreDto>>> GetStores()
    {
        var stores = await _context.Stores.ToListAsync();
        return Ok(_mapper.Map<IEnumerable<StoreDto>>(stores));
    }

    //GET: api/getStoreKeepers
    //[HttpGet]
    //public async Task<ActionResult<IEnumerable<StoreKeeper>>> getStoreKeepers()
    //{
    //    var stores = await _context.StoreKeepers.ToListAsync();
    //    return Ok(_mapper.Map<IEnumerable<StoreKeeperDto>>(StoreKeeper));
    //}


    // GET: api/Store/5
    [HttpGet("{id}")]
    public async Task<ActionResult<StoreDto>> GetStore(int id)
    {
        var store = await _context.Stores.FindAsync(id);

        if (store == null)
        {
            return NotFound();
        }

        return _mapper.Map<StoreDto>(store);
    }

    // PUT: api/Store/5
    [HttpPut("{id}")]
    public async Task<IActionResult> PutStore(int id, StoreDto storeDto)
    {
        if (id != storeDto.StoreId)
        {
            return BadRequest();
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
                return NotFound();
            }
            else
            {
                throw;
            }
        }

        return NoContent();
    }

    // POST: api/Store
    [HttpPost]
    public async Task<ActionResult<StoreDto>> PostStore(StoreDto storeDto)
    {
        var store = _mapper.Map<Store>(storeDto);
        _context.Stores.Add(store);
        await _context.SaveChangesAsync();

        return CreatedAtAction("GetStore", new { id = store.StoreId }, _mapper.Map<StoreDto>(store));
    }

    // DELETE: api/Store/5
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteStore(int id)
    {
        var store = await _context.Stores.FindAsync(id);
        if (store == null)
        {
            return NotFound();
        }

        _context.Stores.Remove(store);
        await _context.SaveChangesAsync();

        return NoContent();
    }

    private bool StoreExists(int id)
    {
        return _context.Stores.Any(e => e.StoreId == id);
    }
}