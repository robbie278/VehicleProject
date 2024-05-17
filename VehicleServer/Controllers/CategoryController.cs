//using AutoMapper;
//using AutoMapper.QueryableExtensions;
//using Microsoft.AspNetCore.Mvc;
//using Microsoft.EntityFrameworkCore;
//using VehicleServer.DTOs;
//using VehicleServer.Entities;

//namespace VehicleServer.Controllers
//{
//    [Route("api/[controller]")]
//    [ApiController]
//    public class CategoryController: ControllerBase
//    {

//        private readonly ApplicationContext _context;
//        private readonly IMapper _mapper;

//        public CategoryController(ApplicationContext context, IMapper mapper)
//        {
//            _context = context;
//            _mapper = mapper;
//        }

//        [HttpGet]
//        public async Task<ActionResult<IEnumerable<CategoryDTO>>> GetCategories()
//        {
//            return await _context.Categories.
//                ProjectTo<CategoryDTO>(_mapper.ConfigurationProvider).ToListAsync();
//        }

//    }
//}
