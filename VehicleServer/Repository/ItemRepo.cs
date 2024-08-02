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
                        Description = c.Description,
                        CategoryId = c.Category!.CategoryId,
                        CategoryName = c.Category!.Name,
                        
                        PlatePool = c.PlatePool != null ? new PlatePoolDto
                        {
                            PlatePoolId = c.PlatePool.PlatePoolId,
                            AssignStatus = c.PlatePool.AssignStatus,
                            PlateNumber = c.PlatePool.PlateNumber,
                            MajorId = c.PlatePool.MajorId,
                            MinorId = c.PlatePool.MinorId,
                            PlateSizeId = c.PlatePool.PlateSizeId,
                            VehicleCategoryId = c.PlatePool.VehicleCategoryId,
                            PlateRegionId = c.PlatePool.PlateRegionId,
                            CreatedDate = c.PlatePool.CreatedDate,
                            CreatedByUsername = c.PlatePool.CreatedByUsername,
                            CreatedByUserId = c.PlatePool.CreatedByUserId,
                            LastModifiedDate = c.PlatePool.LastModifiedDate,
                            LastModifiedByUsername = c.PlatePool.LastModifiedByUsername,
                            LastModifiedByUserId = c.PlatePool.LastModifiedByUserId,
                            IsDeleted = c.PlatePool.IsDeleted,
                            DeletedDate = c.PlatePool.DeletedDate,
                            DeletedByUsername = c.PlatePool.DeletedByUsername,
                            DeletedByUserId = c.PlatePool.DeletedByUserId,
                            IsActive = c.PlatePool.IsActive
                        } : null
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
                                           .Include(i => i.PlatePool)
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
        public async Task<IActionResult> PutItem(int id, ItemDto item)
        {
            if (id != item.ItemId)
            {
                return BadRequest();
            }
            // this is for including the plates data in the item
            var mappedItem = _mapper.Map<Item>(item);
            
            _context.Entry(mappedItem).State = EntityState.Modified;

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
