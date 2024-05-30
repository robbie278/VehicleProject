using AutoMapper;
using AutoMapper.QueryableExtensions;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using VehicleServer.DTOs;
using VehicleServer.Entities;

namespace VehicleServer.Repository
{
    public class CategoryRepo
    {
        private readonly IMapper mapper;
        private readonly ApplicationContext _context;

        public CategoryRepo(IMapper mapper, ApplicationContext context)
        {
            this.mapper = mapper;
            this._context = context;
        }

        public async Task<ActionResult<IEnumerable<CategoryDto>>> GetCategories()
        {
            var categoryDto = _context.Categories.
               ProjectTo<CategoryDto>(mapper.ConfigurationProvider);

            return await categoryDto.ToListAsync();
        }

        public async Task<ActionResult<Category>> GetCategory(int id)
        {

            try {
                var Category = await _context.Categories.FindAsync(id);

                return Category;    
               
            } 
            catch{
                throw new Exception("No Data Found!");
            }

        }

        public async Task<ActionResult<Boolean>> PutCategory(int id, CategoryDto categoryDto)
        {
            if (id != categoryDto.CategoryId)
            {
                return false;
            }

            try
            {
                var category = mapper.Map<Category>(categoryDto);
                _context.Entry(category).State = EntityState.Modified;
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!CategoryExists(id))
                {
                    return false;
                }
                else
                {
                    throw;
                }
            }

            return true;
        }
        public async Task<ActionResult<CategoryDto>> PostCategory(CategoryDto categoryDto)
        {
            var category = mapper.Map<Category>(categoryDto);

            var created_catagoty = _context.Categories.Add(category);
            await _context.SaveChangesAsync();

            if (created_catagoty == null) {
                throw new Exception("cant add category");
            }

            return mapper.Map<CategoryDto>(category);
        }

        public async Task<ActionResult<int>> DeleteCategory(int id)
            {
            var category = await _context.Categories.FindAsync(id);
            if (category == null)
            {
                return 0;
            }

            _context.Categories.Remove(category);
            return await _context.SaveChangesAsync();

             
        }

        // just chaking the catagory exists before submiting
        private bool CategoryExists(int id)
        {
            return _context.Categories.Any(e => e.CategoryId == id);
        }
    }
}
