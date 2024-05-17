using VehicleServer.Entities;

namespace VehicleServer.DTOs
{
    public class ItemDto
    {
        public int ItemId { get; set; }
        public string? Name { get; set; }
        public string? Description { get; set; }
        public int Quantity { get; set; }
        public bool Availability { get; set; }
        public int CategoryId { get; set; }
        public string? CategoryName { get; set; }

        //public Category? Category { get; set; }
        //public ICollection<Store>? Stores { get; set; }
    }
}
