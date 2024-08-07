namespace VehicleServer.Entities
{
    public class PlatePool
    {
        public int PlatePoolId { get; set; }
        public int AssignStatus { get; set; }
        public string PlateNumber { get; set; } = string.Empty;
        public int MajorId { get; set; }
        public int? MinorId { get; set; }
        public int PlateSizeId { get; set; }
        public int VehicleCategoryId { get; set; }
        public int PlateRegionId { get; set; }
        public DateTime? CreatedDate { get; set; }
        public string? CreatedByUsername { get; set; }
        public Guid? CreatedByUserId { get; set; }
        public DateTime? LastModifiedDate { get; set; }
        public string? LastModifiedByUsername { get; set; }
        public Guid? LastModifiedByUserId { get; set; }
        public bool IsDeleted { get; set; }
        public DateTime? DeletedDate { get; set; }
        public string? DeletedByUsername { get; set; }
        public Guid? DeletedByUserId { get; set; }
        public bool IsActive { get; set; }

        // Navigation properties
        public StockTransaction? StockTransactions { get; set; }
    }
}
