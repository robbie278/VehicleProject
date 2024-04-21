using VehicleServer.DTOs;

namespace VehicleServer.Entities
{
    public class Store
    {
        public int StoreId { get; set; }
        public string? Name { get; set; }
        public string? Address { get; set; }
        public ICollection<StoreKeeper>? StoreKeepers { get; set; }
        public ICollection<Item> Items { get; set; } = new List<Item>();    


    }
}
