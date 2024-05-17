using VehicleServer.Entities;

namespace VehicleServer.DTOs
{
    public class StoreDto
    {
        public int StoreId { get; set; }
        public string? Name { get; set; }
        public string? Address { get; set; }
        public ICollection<StoreKeeper>? StoreKeepers { get; set; }
        public ICollection<Item>? Items { get; set; }
    }
}
