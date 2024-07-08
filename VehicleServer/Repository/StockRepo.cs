using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using VehicleServer.DTOs;
using VehicleServer.Entities;

namespace VehicleServer.Repository
{
    public class StockRepo
    {
        private readonly ApplicationContext _context;
        private readonly IMapper _mapper;

        public StockRepo(ApplicationContext context, IMapper mapper)
        {
            this._context = context;
            this._mapper = mapper;
        }

       

        public async Task<IEnumerable<StockDto>> GetStocks()
        {
            var Stock = _context.Stocks.Where(c => c.QuantityInStock > 0).Select(c => new StockDto()
            {
                StockId = c.StockId,
                QuantityInStock = c.QuantityInStock,
                ItemId = c.Items!.ItemId,
                ItemName = c.Items!.Name,
                StoreId = c.Stores!.StoreId,
                StoreName = c.Stores!.Name,
                LastUpdatedDate = c.LastUpdatedDate



            });

            return await Stock.ToListAsync();
        }




        // GET: api/Stock/5
        [HttpGet("{id}")]
        public async Task<ActionResult<StockDto>> GetStock(int id)
        {
            var Stock = await _context.Stocks.FindAsync(id);

            if (Stock == null)
            {
                throw new Exception("No Data Found!");
            }

            return _mapper.Map<StockDto>(Stock);
        }

        // PUT: api/Stock/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutStock(int id, StockDto StockDto)
        {
            if (id != StockDto.StockId)
            {
                throw new Exception("No id!");
            }

            var Stock = _mapper.Map<Stock>(StockDto);
            _context.Entry(Stock).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!StockExists(id))
                {
                    throw new Exception("The Id Not Correct!");
                }
                else
                {
                    throw;
                }
            }

            return null;
        }

        // POST: api/Stock
        [HttpPost]
        public async Task<ActionResult<StockDto>> PostStock(StockDto StockDto)
        {
            var Stock = _mapper.Map<Stock>(StockDto);
            var result = _context.Stocks.Add(Stock);
            await _context.SaveChangesAsync();

            //return CreatedAtAction("GetStock", new { id = Stock.StockId }, _mapper.Map<StockDto>(Stock));
            return _mapper.Map<StockDto>(Stock);
        }

        // DELETE: api/Stock/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteStock(int id)
        {
            var Stock = await _context.Stocks.FindAsync(id);
            if (Stock == null)
            {
                throw new Exception("Id Not found!");
            }

            _context.Stocks.Remove(Stock);
            await _context.SaveChangesAsync();

            return null;
        }

        private bool StockExists(int id)
        {
            return _context.Stocks.Any(e => e.StockId == id);
        }
    }
}

