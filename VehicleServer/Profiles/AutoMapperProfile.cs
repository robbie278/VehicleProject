using AutoMapper;
using VehicleServer.DTOs;
using VehicleServer.Entities;


namespace VehicleServer.Profiles

{
    public class AutoMapperProfile : Profile
    {

        public AutoMapperProfile()
        {
            CreateMap<Category, CategoryDto>().ReverseMap();
        }
    }
}
