using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using VehicleServer.Entities;

namespace VehicleServer.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CategoryController: ControllerBase
    {
        private readonly ApplicationContext _context;
        public CategoryController(ApplicationContext context)
        {
            _context = context;
        }
        [HttpGet]
        public async Task<ActionResult<ApiResult<Category>>> GetCategory(
            int pageIndex = 0,
            int pageSize = 10,
            string? sortColumn = null,
            string? sortOrder = null,
            string? filterColumn = null,
            string? filterQuery = null)
        {
            return await ApiResult<Category>.CreateAsync(
             _context.Categories.AsNoTracking(),
             pageIndex,
             pageSize,
             sortColumn,
             sortOrder,
             filterColumn,
             filterQuery);
        }
    }
}
