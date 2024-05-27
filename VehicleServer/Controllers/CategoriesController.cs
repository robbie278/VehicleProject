using AutoMapper.QueryableExtensions;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using VehicleServer.Entities;
using VehicleServer.DTOs;
using VehicleServer.Repository;

namespace VehicleServer.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CategoriesController : ControllerBase
    {
       
        private readonly CategoryRepo categoryRepo;

        public CategoriesController(CategoryRepo categoryRepo)
        {
            this.categoryRepo = categoryRepo;
        }

        // GET: api/Categories
        [HttpGet]
        public async Task<ActionResult<IEnumerable<CategoryDto>>> GetCategories()
        {

            return await categoryRepo.GetCategories();
        }

        // GET: api/Categories/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Category>> GetCategory(int id)
        {

            return await categoryRepo.GetCategory(id);
        }

        // PUT: api/Categories/5
        [HttpPut("{id}")]
        public async Task<ActionResult> PutCategory(int id, CategoryDto categoryDto)
        {
            var result = await categoryRepo.PutCategory(id, categoryDto);
            if (result == null)
            {
                return BadRequest();
            }

            return Ok(result);
            

            //return await categoryRepo.PutCategory(id, categoryDto);
        }

        // POST: api/Catagories
        [HttpPost]
        public async Task<ActionResult<CategoryDto>> PostCategory(CategoryDto categoryDto)
        {
            return await categoryRepo.PostCategory(categoryDto);
        }

        // DELETE: api/Categories/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteCategory(int id)
        {
            var result = await categoryRepo.DeleteCategory(id);
            if (result == null) { 
                return BadRequest();
            }
            return Ok(result);
        }


    }
}
