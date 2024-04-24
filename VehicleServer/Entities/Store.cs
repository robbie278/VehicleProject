namespace VehicleServer.Entities
{
    public class Store
    {
        public int StoreId { get; set; }
        public string? Name { get; set; }
        public string? address { get; set; }
        public ICollection<StoreKeeper>? StoreKeepers { get; set; }
        public ICollection<ItemDto>? Items { get; set; }


    }
}
