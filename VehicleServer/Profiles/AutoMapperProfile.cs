using AutoMapper;
using VehicleServer.DTOs;
using VehicleServer.Entities;

namespace VehicleServer.Profiles
{
    public class AutoMapperProfile : Profile
    {
        public AutoMapperProfile()
        {
            CreateMap<StoreKeeper, StoreKeeperDTO>();
            CreateMap<StoreKeeperDTO, StoreKeeper>();

               CreateMap<Store, StoreDTO>();
               CreateMap<StoreDTO, Store>();
        }
    }
}
