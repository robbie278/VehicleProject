using Microsoft.AspNetCore.Mvc;
using VehicleServer.DTOs;
using VehicleServer.Services.ReportServices;

namespace VehicleServer.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ReportsController : ControllerBase
    {
        private readonly IStockReportService _stockReportService;

        public ReportsController(IStockReportService stockReportService)
        {
            _stockReportService = stockReportService;
        }

        [HttpGet("stock-summary")]
        public async Task<ActionResult<StockSummaryDto>> GetStockSummary()
        {
            var result = await _stockReportService.GetStockSummaryAsync();
            return Ok(result);
        }

        [HttpGet("stock-transactions")]
        public async Task<ActionResult<List<StockTransactionDto>>> GetStockTransactions([FromQuery] DateTime? startDate, [FromQuery] DateTime? endDate, [FromQuery] int? storeId, [FromQuery] int? itemId, [FromQuery] string transactionType)
        {
            var result = await _stockReportService.GetStockTransactionsAsync(startDate, endDate, storeId, itemId, transactionType);
            return Ok(result);
        }

        [HttpGet("store-performance")]
        public async Task<ActionResult<List<StorePerformanceDto>>> GetStorePerformance()
        {
            var result = await _stockReportService.GetStorePerformanceAsync();
            return Ok(result);
        }

        [HttpGet("item-transaction-history/{itemId}")]
        public async Task<ActionResult<ItemTransactionHistoryDto>> GetItemTransactionHistory(int itemId, [FromQuery] DateTime? startDate, [FromQuery] DateTime? endDate, [FromQuery] int? storeId)
        {
            var result = await _stockReportService.GetItemTransactionHistoryAsync(itemId, startDate, endDate, storeId);
            return Ok(result);
        }
    }
}
