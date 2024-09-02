using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using VehicleServer.DTOs;

namespace VehicleServer.Entities
{
    [Table("StockStores")]
    public class Store
    {
        [Key]
        public int StoreId { get; set; }
        public string? Name { get; set; }
        public string? Address { get; set; }
        public bool? IsDeleted { get; set; }

        public ICollection<StoreKeeper>? StoreKeepers { get; set; }

        public ICollection<StockTransaction> StocksTransactions { get; set; }

        public ICollection<Stock>? Stock { get; set; }


    }
}
