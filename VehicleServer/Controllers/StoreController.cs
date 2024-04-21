using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using VehicleServer.DTOs;
using AutoMapper.QueryableExtensions;


namespace VehicleServer.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class StoreController : ControllerBase
    {
        private readonly ApplicationContext _context;
        private readonly IMapper _mapper;

        public StoreController(ApplicationContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        // GET: api/Stores
        [HttpGet]
        public async Task<ActionResult<IEnumerable<StoreDTO>>> GetStores()
        {
            return await _context.Stores.
                ProjectTo<StoreDTO>(_mapper.ConfigurationProvider).ToListAsync();
        }
    }
}
