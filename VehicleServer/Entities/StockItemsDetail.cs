using System.ComponentModel.DataAnnotations;

namespace VehicleServer.Entities
{
    public class StockItemsDetail
    {
        [Key]
        public int StockItemsDetailId { get; set; }
        public int ItemId { get; set; }
        public int StoreId { get; set; }
        public int? UserId { get; set; }
        public int StoreKeeperId { get; set; }
        public string TransactionType { get; set; } // Issue or Receipt
        public int PadNumber { get; set; }
        public DateTime TransactionDate { get; set; } = DateTime.Now;
        public virtual Item? Items { get; set; }
        public virtual Store? Stores { get; set; }
        public virtual User? User { get; set; }
        public virtual StoreKeeper? StoreKeeper { get; set; }


        // navigation for plate pool
        public int PlatePoolId { get; set; }  // Foreign key to PlatePool
        public virtual PlatePool? PlatePool { get; set; }

    }

}
