using Microsoft.AspNetCore.Mvc;
using VehicleServer.Entities;
using VehicleServer.Services.StockTransactionDetailServices;
using VehicleServer.Repository;
    using System.Threading.Tasks;
    using Microsoft.AspNetCore.Mvc;
    using VehicleServer.DTOs;
    using VehicleServer.Entities;

namespace VehicleServer.Controllers
{


    [Route("api/[controller]")]
    [ApiController]
    public class StockTransactionDetailController : ControllerBase
    {
        private readonly IStockItemsDetailService _stockTransactionDetailService;

        public StockTransactionDetailController(IStockItemsDetailService stockTransactionDetailService)
        {
            _stockTransactionDetailService = stockTransactionDetailService;
        }

        [HttpPost("validate")]
        public async Task<IActionResult> ValidateStockTransaction([FromBody] ValidationRequest request)
        {
            var transactionDetail = new StockItemsDetail
            {
                ItemId = request.ItemId,
                StoreId = request.StoreId,
                UserId = request.UserId,
                StoreKeeperId = request.StoreKeeperId,
                TransactionType = request.TransactionType,
                TransactionDate = request.TransactionDate
            };

            var isValid = await _stockTransactionDetailService.ValidateTransactionAsync(transactionDetail, request.PadNumberStart, request.PadNumberEnd);

            if (!isValid)
            {
                return BadRequest("Validation failed.");
            }

            return Ok("Validation successful.");
        }

        [HttpGet("stockitems")]
        public async Task<IActionResult> GetStockItemsDetail(
            [FromQuery] int storeId, 
            [FromQuery] int itemId, 
            [FromQuery] int pageIndex = 0, 
            [FromQuery] int pageSize = 5, 
            [FromQuery] string? sortColumn = null, 
            [FromQuery] string? sortOrder = null, 
            string? filterColumn = null,
            string? filterQuery = null)
        {
            var result = await _stockTransactionDetailService.GetStockItemsDetailAsync(
                storeId, itemId, 
                pageIndex, pageSize, 
                sortColumn, sortOrder, 
                filterColumn, filterQuery
                );

            return Ok(result);
        }

        [HttpGet("pad-numbers")]
        public async Task<ActionResult<PadNumberRangeDto>> GetPadNumbers([FromQuery] int quantity)
        {
            if (quantity < 1)
            {
                return BadRequest("Quantity must be at least 1.");
            }

            var padNumbers = await _stockTransactionDetailService.GetAvailablePadNumbers(quantity);

            if (padNumbers == null || padNumbers.Start == 0 || padNumbers.End == 0)
            {
                return NotFound("No available pad numbers found for the requested quantity.");
            }

            return Ok(padNumbers);
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<StockItemsDetail>>> GetAllStockItemsDetails()
        {
            var stockItemsDetails = await _stockTransactionDetailService.GetAllStockItemsDetailsAsync();
            return Ok(stockItemsDetails);
        }

        [HttpGet("{storeId}")]
        public async Task<ActionResult<IEnumerable<StockItemsDetail>>> GetStockItemsDetailsByStoreId(int storeId)
        {
            var stockItemsDetails = await _stockTransactionDetailService.GetStockItemsDetailsByStoreIdAsync(storeId);
            return Ok(stockItemsDetails);
        }

        [HttpGet("transaction/{transactionType}")]
        public async Task<ActionResult<IEnumerable<StockItemsDetail>>> GetStockItemsDetailsByTransactionType(string transactionType)
        {
            var stockItemsDetails = await _stockTransactionDetailService.GetStockItemsDetailsByTransactionTypeAsync(transactionType);
            return Ok(stockItemsDetails);
        }

    }

    public class ValidationRequest
    {
        public int ItemId { get; set; }
        public int StoreId { get; set; }
        public int? UserId { get; set; }
        public int StoreKeeperId { get; set; }
        public string TransactionType { get; set; } 
        public int PadNumberStart { get; set; }
        public int PadNumberEnd { get; set; }
        public DateTime TransactionDate { get; set; } = DateTime.Now;
    }

}
