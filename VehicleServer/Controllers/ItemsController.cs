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
            public async Task<ActionResult<IEnumerable<ItemDto>>> GetItems()
            {
                return await itemRepo.GetItems();
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
            return await itemRepo.DeleteItem(id);
        }

    }
}
