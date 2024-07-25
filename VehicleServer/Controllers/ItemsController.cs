using AutoMapper;
using AutoMapper.QueryableExtensions;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Diagnostics.Metrics;
using System.Linq;
using VehicleServer.DTOs;
using VehicleServer.Entities;
using VehicleServer.Repository;

namespace VehicleServer.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ItemsController : ControllerBase
    {
       
        private readonly ItemRepo itemRepo;

        public ItemsController( ItemRepo itemRepo)
        {
            
            this.itemRepo = itemRepo;
        }      
        
            [HttpGet]
            public async Task<ActionResult<ApiResult<ItemDto>>> GetItems(
                  int pageIndex = 0,
                  int pageSize = 10,
                  string? sortColumn = null,
                  string? sortOrder = null,
                  string? filterColumn = null,
                  string? filterQuery = null)
            {
                  return await itemRepo.GetItems(pageIndex, pageSize, sortColumn, sortOrder, filterColumn, filterQuery);
            }

        [HttpGet("Category/{id}")]
        public async Task<ActionResult<IEnumerable<Item>>> GetItemsByCategory(int id)
        {
            return await itemRepo.GetItemsByCategory(id);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Item>> GetItem(int id)
        {
            return await itemRepo.GetItem(id);
        }
        // PUT: api/Countries/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutItem(int id, Item item)
        {
            return await itemRepo.PutItem(id, item);
        }


        // POST: api/Countries
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<ItemDto>> PostItem(ItemDto itemDto)
        {
            return await itemRepo.PostItem(itemDto);
        }
        // DELETE: api/Countries/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteItem(int id)
        {
            var result = await itemRepo.DeleteItem(id);

            if (result == null)
            {
                return BadRequest();
            }
            return Ok(result);
        }
        [HttpPost]
        [Route("isDupeItem")]
        public bool isDupeItem(ItemDto item)
        {
            return itemRepo.isDupeItem(item);
        }

    }
}
