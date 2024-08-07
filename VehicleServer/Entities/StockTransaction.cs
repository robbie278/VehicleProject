using System.ComponentModel.DataAnnotations;

namespace VehicleServer.Entities
{
    public class StockTransaction
    {
        [Key]
        public int StockTransactionId { get; set; }
        public int ItemId { get; set; }
        public int StoreId { get; set; }
        public int? UserId { get; set; }
        public int StoreKeeperId { get; set; }
        public string TransactionType { get; set; } // Issue or Receipt
        public int Quantity { get; set; }
        public int PadNumberStart { get; set; }
        public int? PadNumberEnd { get; set; }
        public bool? IsDeleted { get; set; }

        public DateTime TransactionDate { get; set; } = DateTime.Now;
        public virtual Item? Items { get; set; }
        public virtual Store? Stores { get; set; }
        public virtual User? User { get; set; }
        public virtual StoreKeeper? StoreKeeper { get; set; }

        // a plate related properties
        // Foreign key
        public int PlatePoolId { get; set; }

        // Navigation property
        public PlatePool? PlatePools { get; set; }

    }

}
