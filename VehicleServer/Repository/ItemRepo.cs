using AutoMapper;
using AutoMapper.QueryableExtensions;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Cryptography.X509Certificates;
using VehicleServer.DTOs;
using VehicleServer.Entities;
using VehicleServer.Migrations;



namespace VehicleServer.Repository
{
    public class ItemRepo: ControllerBase
    {
        private readonly IMapper _mapper;
        private readonly ApplicationContext _context;

        public ItemRepo(IMapper mapper, ApplicationContext context)
        {
            this._mapper = mapper;
            this._context = context;
        }
        public async Task<ApiResult<ItemDto>> GetItems(
                int pageIndex = 0,
              int pageSize = 10,
              string? sortColumn = null,
              string? sortOrder = null,
              string? filterColumn = null,
              string? filterQuery = null)
        {
                return await ApiResult<ItemDto>.CreateAsync(
                    _context.Items.AsNoTracking().Where(ct => ct.IsDeleted != true).Select(c => new ItemDto()
                    {
                        
                        ItemId = c.ItemId,
                        Name = c.Name,
                        IsPlate=c.IsPlate,
                        Description = c.Description,
                        CategoryId = c.Category!.CategoryId,
                        CategoryName = c.Category.Name,
                        
                        

                    }),

                    pageIndex,
                    pageSize,
                    sortColumn,
                    sortOrder,
                    filterColumn,
                    filterQuery);
        }
        public async Task<ActionResult<IEnumerable<Item>>> GetItemsByCategory(int id)
        {
            var items = await _context.Items
                                          .Where(it => it.CategoryId == id)
                                           
                                          .ToListAsync();
            return items;

        }
        public async Task<ActionResult<Item>> GetItem(int id)
        {
            var item = await _context.Items.FindAsync(id);

            if (item == null)
            {
                return NotFound();
            }

            return item;
        }
        public async Task<IActionResult> PutItem(int id, Item item)
        {
            if (id != item.ItemId)
            {
                return BadRequest();
            }
          
           
            
            _context.Entry(item).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ItemExists(id))
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

        public async Task<ActionResult<ItemDto>> PostItem(ItemDto itemDto)
        {
            // Check if the itemDto has a valid CategoryId
            if (itemDto.CategoryId == 0)
            {
                return BadRequest("CategoryId cannot be zero.");
            }

            // Find the category in the database
            var category = await _context.Categories.FindAsync(itemDto.CategoryId);
            if (category == null)
            {
                return BadRequest("Category does not exist.");
            }

            // Ensure the category has a valid Name
            if (string.IsNullOrEmpty(category.Name))
            {
                return BadRequest("Category Name cannot be null or empty.");
            }

            // Map ItemDto to Item entity
            var item = _mapper.Map<Item>(itemDto);

            // Set the category navigation property
            item.Category = category;

            // Add the item to the context
            _context.Items.Add(item);
            await _context.SaveChangesAsync();

            // Map the saved item back to ItemDto
            var result = _mapper.Map<ItemDto>(item);

            // Set the CategoryName property in the result
            result.CategoryName = category.Name;

            // Return the created item
            return CreatedAtAction(nameof(GetItem), new { id = item.ItemId }, result);
        }

        public async Task<IActionResult> DeleteItem(int id)
        {
            var item = await _context.Items.FindAsync(id);
            if (item == null)
            {
                return NotFound();
            }
            
            item.IsDeleted = true;
            _context.Entry(item).State = EntityState.Modified;
            await _context.SaveChangesAsync();

            return NoContent();
        }

        // just chaking the catagory exists before submiting
        private bool ItemExists(int id)
        {
            return _context.Categories.Any(e => e.CategoryId == id);
        }
        public bool isDupeItem(ItemDto item)
        {
            return _context.Items.AsNoTracking().Any(
                 e => e.Name == item.Name
                && e.ItemId != item.ItemId
                && e.CategoryId == item.CategoryId
                );
        }
    }
}
