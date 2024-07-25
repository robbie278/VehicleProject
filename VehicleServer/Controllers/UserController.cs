using Microsoft.AspNetCore.Mvc;
using VehicleServer.Entities;
using VehicleServer.Repository;

namespace VehicleServer.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController: ControllerBase
    {
        private readonly UserRepo userRepo;

        public UserController(UserRepo userRepo) 
        {
            this.userRepo = userRepo;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<User>>> GetUsers()
        {
            return await userRepo.GetUsers();
        }

    }
}
