using System.ComponentModel.DataAnnotations.Schema;

namespace VehicleServer.Entities
{
    [Table("StockUsers")]
    public class User
    {
        public int UserId { get; set; }
        public string UserName { get; set; }
        public string UserEmail { get; set; }
        public string UserRole { get; set; }
        

        public ICollection<StockTransaction> StockTransactions { get; set; }

        //public byte[] PasswordHash { get; set; }
        //public byte[] PasswordSalt { get; set; }

    }

}
