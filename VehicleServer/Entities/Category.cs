using System.ComponentModel.DataAnnotations.Schema;

namespace VehicleServer.Entities
{
    [Table("StockCategories")]
    public class Category
    {
        public int CategoryId { get; set; }
        public string? Name { get; set; }

        public string? NameAm { get; set;  }
        public string? Description { get; set; }

        public string? DescriptionAm { get; set; }
        public bool? IsDeleted { get; set; }

        public ICollection<Item>? Items { get; set; }   

    }
}
