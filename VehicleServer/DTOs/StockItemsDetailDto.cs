namespace VehicleServer.DTOs
{
    public class StockItemsDetailDto
    {
        public int StockItemsDetailId { get; set; }
        public int ItemId { get; set; }
        public int StoreId { get; set; }
        public int PadNumber { get; set; }
        public string? ItemName { get; set; }
        public string? StoreName { get; set; }
    }
}
