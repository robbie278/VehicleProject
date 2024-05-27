﻿using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
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

        public async Task<ActionResult<IEnumerable<StockTransactionDto>>> GetStockTransactions()
        {
            var StockTransactions = await _context.StockTransactions.ToListAsync();

            var StockTransactionDtos = _mapper.Map<List<StockTransactionDto>>(StockTransactions);

            return StockTransactionDtos;
        }




        // GET: api/StockTransaction/5
        [HttpGet("{id}")]
        public async Task<ActionResult<StockTransactionDto>> GetStockTransaction(int id)
        {
            var StockTransaction = await _context.StockTransactions.FindAsync(id);

            if (StockTransaction == null)
            {
                throw new Exception("No Data Found!");
            }

            return _mapper.Map<StockTransactionDto>(StockTransaction);
        }

        // PUT: api/StockTransaction/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutStockTransaction(int id, StockTransactionDto StockTransactionDto)
        {
            if (id != StockTransactionDto.TransactionId)
            {
                throw new Exception("No id!");
            }

            var StockTransaction = _mapper.Map<StockTransaction>(StockTransactionDto);
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
        public async Task<IActionResult> DeleteStockTransaction(int id)
        {
            var StockTransaction = await _context.StockTransactions.FindAsync(id);
            if (StockTransaction == null)
            {
                throw new Exception("Id Not found!");
            }

            _context.StockTransactions.Remove(StockTransaction);
            await _context.SaveChangesAsync();
            
            return null;
        }

        private bool StockTransactionExists(int id)
        {
            return _context.StockTransactions.Any(e => e.TransactionId == id);
        }
    }
}
