using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using VehicleServer.DTOs;
using VehicleServer.Entities;
using VehicleServer;
using VehicleServer.Repository;

[ApiController]
[Route("api/[controller]")]
 
public class StoreController : ControllerBase
{
    private readonly ApplicationContext _context;
    private readonly IMapper _mapper;
    private readonly StoreRepo storeRepo;

    public StoreController(ApplicationContext context, IMapper mapper, StoreRepo storeRepo)
    {
        _context = context;
        _mapper = mapper;
        this.storeRepo = storeRepo;
    }

    // GET: api/Store
    //-------------------------------------------
    [HttpGet]
    public async Task<ActionResult<ApiResult<StoreDto>>> GetStores(
                   int pageIndex = 0,
       int pageSize = 10,
       string? sortColumn = null,
       string? sortOrder = null,
       string? filterColumn = null,
       string? filterQuery = null)
    {
        return await storeRepo.GetStores(pageIndex, pageSize, sortColumn, sortOrder, filterColumn, filterQuery);
    }
    //-------------------------------------------


    // GET: api/Store/5
    [HttpGet("{id}")]
    public async Task<ActionResult<StoreDto>> GetStore(int id)
    {
       return await storeRepo.GetStore(id);
    }

    // PUT: api/Store/5
    [HttpPut("{id}")]
    public async Task<ActionResult<Boolean>> PutStore(int id, StoreDto storeDto)
    {
        return await storeRepo.PutStore(id, storeDto);
    }

    // POST: api/Store
    [HttpPost]
    public async Task<ActionResult<StoreDto>> PostStore(StoreDto storeDto)
    {
        return await storeRepo.PostStore(storeDto);
    }

    // DELETE: api/Store/5
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteStore(int id)
    {
        var result = await storeRepo.DeleteStore(id);
        if (result == null)
        {
            return BadRequest();
        }
        return Ok(result);
    }

    [HttpPost]
    [Route("isDupeStore")]
    public bool isDupeStore(StoreDto store)
    {
        return storeRepo.isDupeStore(store);
    }


}