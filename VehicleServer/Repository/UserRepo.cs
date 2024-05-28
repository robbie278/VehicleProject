using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using VehicleServer.DTOs;
using VehicleServer.Entities;

namespace VehicleServer.Repository
{
    public class UserRepo
    {
        private readonly ApplicationContext _context;
        private readonly IMapper _mapper;

        public UserRepo(ApplicationContext context, IMapper mapper)
        {
            this._context = context;
            this._mapper = mapper;
        }

        public async Task<ActionResult<IEnumerable<User>>> GetUsers()
        {
            var user = await _context.User.ToListAsync();


            return user;
        }
    }
}
