
namespace VehicleServer.DTOs
{
    public class ItemDto
    {
        public int ItemId { get; set; }
        public string? Name { get; set; }
        public string? Description { get; set; }
        public int CategoryId { get; set; }
        public string? CategoryName { get; set; }

        // this is plate relation
    
        public PlatePoolDto? PlatePool { get; set; }


    }
}
