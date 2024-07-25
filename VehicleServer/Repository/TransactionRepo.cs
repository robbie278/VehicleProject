using AutoMapper;
using AutoMapper.QueryableExtensions;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using System.Security.Cryptography.X509Certificates;
using VehicleServer.DTOs;
using VehicleServer.Entities;

namespace VehicleServer.Repository
{
    public class TransactionRepo
    {

        private readonly ApplicationContext _context;
        private readonly IMapper _mapper;


        public TransactionRepo(ApplicationContext context, IMapper mapper)
        {
            this._context = context;
            this._mapper = mapper;

        }

        public async Task<ActionResult<ApiResult<StockTransactionDto>>> GetStockTransactions(
                int pageIndex = 0,
                int pageSize = 10,
                string? sortColumn = null,
                string? sortOrder = null,
                string? filterColumn = null,
                string? filterQuery = null,
                string? transactionType = null,
                int? storeId = null,
                int? itemId = null)
        {
            var query = _context.StockTransactions.AsNoTracking().Where(ct => ct.IsDeleted != true);

            // getting transactions by store id from db
            if (storeId.HasValue)
            {
                query = query.Where(c => c.StoreId == storeId);
            }

            //getting transaction by item it
            if (itemId.HasValue)
            {
                query = query.Where(c => c.ItemId == itemId);
            }

            if (!string.IsNullOrEmpty(transactionType) && transactionType!= "All")
            {
                query = query.Where(c => c.TransactionType == transactionType);
            }

            return await ApiResult<StockTransactionDto>.CreateAsync(
                    query.Select(c => new StockTransactionDto()
                    {
                        StockTransactionId = c.StockTransactionId,
                        TransactionType = c.TransactionType,
                        Quantity = c.Quantity,
                        ItemId = c.Items!.ItemId,
                        ItemName = c.Items!.Name,
                        StoreId = c.Stores!.StoreId,
                        StoreName = c.Stores!.Name,
                        StoreKeeperId = c.StoreKeeper!.StoreKeeperId,
                        StoreKeeperName = c.StoreKeeper!.Name,
                        UserId = c.User!.UserId,
                        UserName = c.User!.UserName,
                    }),
                    pageIndex,
                    pageSize,
                    sortColumn,
                    sortOrder,
                    filterColumn,
                    filterQuery);


        }




        // GET: api/StockTransaction/5
        [HttpGet("{id}")]
        public async Task<ActionResult<StockTransactionDto>> GetStockTransaction(int id)
        {
            var stockTransaction = await _context.StockTransactions
         .Where(t => t.StockTransactionId == id)
         .Select(c => new StockTransactionDto
         {
             StockTransactionId = c.StockTransactionId,
             TransactionType = c.TransactionType,
             Quantity = c.Quantity,
             ItemId = c.Items!.ItemId,
             ItemName = c.Items!.Name,
             StoreId = c.Stores!.StoreId,
             StoreName = c.Stores!.Name,
             PadNumberStart = c.PadNumberStart!,
             PadNumberEnd = c.PadNumberEnd?? 0,
             StoreKeeperId = c.StoreKeeper!.StoreKeeperId,
             StoreKeeperName = c.StoreKeeper!.Name,
             UserId = c.User!.UserId,
             UserName = c.User!.UserName,
         })
         .FirstOrDefaultAsync();  // Use FirstOrDefaultAsync to get a single result

            // Check if the transaction exists
            if (stockTransaction == null)
            {
                throw new Exception("No Data Found!");
            }

            // Map the result to StockTransactionDto
            return (stockTransaction);



        }

        public async Task<StockTransaction?> GetStockTransactionEntity(int id)
        {
            return await _context.StockTransactions.FindAsync(id);
        }

        // PUT: api/StockTransaction/5
        public async Task<ActionResult<Boolean>> PutStockTransaction(int id, StockTransaction stockTransactionDto)
        {
            if (id != stockTransactionDto.StockTransactionId)
            {
                throw new Exception("No id!");
            }

            var StockTransaction = _mapper.Map<StockTransaction>(stockTransactionDto);
            _context.Entry(StockTransaction).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!StockTransactionExists(id))
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

        // POST: api/StockTransaction
        [HttpPost]
        public async Task<ActionResult<StockTransactionDto>> PostStockTransaction(StockTransactionDto StockTransactionDto)
        {
            var StockTransaction = _mapper.Map<StockTransaction>(StockTransactionDto);
            var result = _context.StockTransactions.Add(StockTransaction);
            await _context.SaveChangesAsync();

            //return CreatedAtAction("GetStockTransaction", new { id = StockTransaction.StockTransactionId }, _mapper.Map<StockTransactionDto>(StockTransaction));
            return _mapper.Map<StockTransactionDto>(StockTransaction);
        }

        // DELETE: api/StockTransaction/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<int>> DeleteStockTransaction(int id)
        {
            var stockTransaction = await _context.StockTransactions.FindAsync(id);
            if (stockTransaction == null)
            {
                throw new Exception("Id Not found!");
            }

            stockTransaction.IsDeleted = true;
            _context.Entry(stockTransaction).State = EntityState.Modified;
            return await _context.SaveChangesAsync();

        }

        private bool StockTransactionExists(int id)
        {
            return _context.StockTransactions.Any(e => e.StockTransactionId == id);
        }

    }
}