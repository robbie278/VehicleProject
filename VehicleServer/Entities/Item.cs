using System.ComponentModel.DataAnnotations.Schema;
using VehicleServer.DTOs;
using VehicleServer.Enums;

namespace VehicleServer.Entities
{
    [Table("StockItems")]
    public class Item
    {
        public int ItemId { get; set; }
        public string? Name { get; set; }
        public string? NameAm { get; set; }
        public string? Description { get; set; }
        public int CategoryId { get; set; }
        public Category? Category { get; set; }
        public bool? IsDeleted { get; set; }

        public bool? IsPlate { get; set; }

        public ItemTypeEnum ItemTypeCode { get; set; }

        // New navigation properties
        public ICollection<Stock>? Stock { get; set; }
        public ICollection<StockTransaction>? StockTransactions { get; set; }

    }

}
