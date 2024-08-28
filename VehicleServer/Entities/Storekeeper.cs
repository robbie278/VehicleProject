using System.ComponentModel.DataAnnotations.Schema;

namespace VehicleServer.Entities
{
    [Table("StockStoreKeepers")]
    public class StoreKeeper
    {
        public int StoreKeeperId { get; set; }
        public string? Name { get; set; }
        public string? Email { get; set; }
        public int StoreId { get; set; }
        public Store? Store { get; set; }
        public bool? IsDeleted { get; set; }


        public ICollection<StockTransaction> StockTransactions { get; set; }

    }
}
