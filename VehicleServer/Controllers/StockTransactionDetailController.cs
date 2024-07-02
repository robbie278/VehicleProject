using Microsoft.AspNetCore.Mvc;
using VehicleServer.Entities;
using VehicleServer.Services.StockTransactionDetailServices;
using VehicleServer.Repository;


namespace VehicleServer.Controllers
{
    using System.Threading.Tasks;
    using Microsoft.AspNetCore.Mvc;
    using VehicleServer.Entities;

    [Route("api/[controller]")]
    [ApiController]
    public class StockTransactionDetailController : ControllerBase
    {
        private readonly IStockItemsDetailService _stockTransactionDetailService;
        private readonly StockItemsDetailRepo stockItemsDetailRepo;

        public StockTransactionDetailController(IStockItemsDetailService stockTransactionDetailService, StockItemsDetailRepo stockItemsDetailRepo)
        {
            _stockTransactionDetailService = stockTransactionDetailService;
            this.stockItemsDetailRepo = stockItemsDetailRepo;
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
            var result = await stockItemsDetailRepo.GetStockItemsDetailAsync(
                storeId, itemId, 
                pageIndex, pageSize, 
                sortColumn, sortOrder, 
                filterColumn, filterQuery
                );

            return Ok(result);
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
