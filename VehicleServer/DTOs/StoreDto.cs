using VehicleServer.Entities;

namespace VehicleServer.DTOs
{
    public class StoreDto
    {
        public int StoreId { get; set; }
        public string? Name { get; set; }
        public string? address { get; set; }

        public string? NameAm { get; set; }
        public string? AddressAm { get; set; }
    }
}