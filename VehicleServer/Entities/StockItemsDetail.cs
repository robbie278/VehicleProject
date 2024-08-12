﻿using System.ComponentModel.DataAnnotations;

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
        public bool? IsPlate { get; set; } = false;
        public int? MajorId { get; set; }
        public int? MinorId { get; set; }
        public int? PlateSizeId { get; set; }
        public int? VehicleCategoryId { get; set; }
        public int? PlateRegionId { get; set; }
        public DateTime TransactionDate { get; set; } = DateTime.Now;
        public virtual Item? Items { get; set; }
        public virtual Store? Stores { get; set; }
        public virtual User? User { get; set; }
        public virtual StoreKeeper? StoreKeeper { get; set; }

        // navigation for plate pool
        //public int PlatePoolId { get; set; }
        //public virtual PlatePool? PlatePool { get; set; }

    }

}
