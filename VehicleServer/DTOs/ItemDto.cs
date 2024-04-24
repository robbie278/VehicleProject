namespace VehicleServer.DTOs
{
    public class ItemDTO
    {
        public int ItemId { get; set; }
        public string? Name { get; set; }
        public string? Description { get; set; }
        public int Quantity { get; set; }
        public bool Availability { get; set; }
        public int CategoryId { get; set; }
        public CategoryDto? Category { get; set; }
        public ICollection<StoreDto> Stores { get; set; }
    }
}
