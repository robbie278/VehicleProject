using AutoMapper;
using AutoMapper.QueryableExtensions;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using VehicleServer.DTOs;
using VehicleServer.Entities;



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
        public async Task<ActionResult<IEnumerable<ItemDto>>> GetItems()
        {
            var item = _context.Items.
                ProjectTo<ItemDto>(_mapper.ConfigurationProvider);

            return await item.ToListAsync();

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
            var item = _mapper.Map<Item>(itemDto);

            _context.Items.Add(item);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetItem", new { id = item.ItemId }, item);
        }
        public async Task<IActionResult> DeleteItem(int id)
        {
            var item = await _context.Items.FindAsync(id);
            if (item == null)
            {
                return NotFound();
            }

            _context.Items.Remove(item);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        // just chaking the catagory exists before submiting
        private bool ItemExists(int id)
        {
            return _context.Categories.Any(e => e.CategoryId == id);
        }
    }
}
