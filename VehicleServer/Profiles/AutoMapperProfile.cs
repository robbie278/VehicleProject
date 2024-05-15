using AutoMapper;
using VehicleServer.DTOs;
using VehicleServer.Entities;

namespace VehicleServer.Profiles
{
    public class AutoMapperProfile : Profile
    {
        public AutoMapperProfile()
        {
            CreateMap<StoreKeeper, StoreKeeperDto>();
            CreateMap<StoreKeeperDto, StoreKeeper>();

               CreateMap<Store, StoreDto>();
               CreateMap<StoreDto, Store>();

                CreateMap<Category, CategoryDto>().ReverseMap();
        }
    }
}
