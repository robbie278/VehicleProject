using VehicleServer.Entities;

namespace VehicleServer.DTOs
{
    public class StoreDto
    {
        public int StoreId { get; set; }
        public string? Name { get; set; }
        public string? address { get; set; }
        //public int StoreKeeperId { get; set; }
        //public string? StoreKeeperName { get; set; }


        //public ICollection<StoreKeeper>? StoreKeepers { get; set; }
        //public ICollection<Item>? Items { get; set; }
    }
}
