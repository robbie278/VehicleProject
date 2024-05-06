using VehicleServer.Entities;

namespace VehicleServer.Controllers
{
    public class StoreKeeperDto
    {
        public int StoreKeeperId { get; set; }
        public string Name { get; set; }

        public string Email { get; set; }
        //public int StoreId { get; set; }
        //public Store Store { get; set; }
    }
}
