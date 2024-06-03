using Microsoft.AspNetCore.Mvc;
using VehicleServer.Entities;
using VehicleServer.Services.StockTransactionDetailServices;

namespace VehicleServer.Controllers
{
    using System.Threading.Tasks;
    using Microsoft.AspNetCore.Mvc;
    using VehicleServer.Entities;

    [Route("api/[controller]")]
    [ApiController]
    public class StockTransactionDetailController : ControllerBase
    {
        private readonly IStockTransactionDetailService _stockTransactionDetailService;

        public StockTransactionDetailController(IStockTransactionDetailService stockTransactionDetailService)
        {
            _stockTransactionDetailService = stockTransactionDetailService;
        }

        [HttpPost("validate")]
        public async Task<IActionResult> ValidateStockTransaction([FromBody] ValidationRequest request)
        {
            var transactionDetail = new StockTransactionDetail
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
    }

    public class ValidationRequest
    {
        public int ItemId { get; set; }
        public int StoreId { get; set; }
        public int? UserId { get; set; }
        public int StoreKeeperId { get; set; }
        public string TransactionType { get; set; } // Issue or Receipt
        public int PadNumberStart { get; set; }
        public int PadNumberEnd { get; set; }
        public DateTime TransactionDate { get; set; } = DateTime.Now;
    }

}
