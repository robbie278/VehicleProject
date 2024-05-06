using AutoMapper;
using VehicleServer.Controllers;
using VehicleServer.DTOs;
using VehicleServer.Entities;

namespace VehicleServer.Profiles
{
    public class GeneralProfile: Profile
    {
        public GeneralProfile()
        {

            CreateMap<Store, StoreDto>();
            CreateMap<StoreDto, Store>();

            // maping of the storekeeper to the dto
            CreateMap<StoreKeeper, StoreKeeperDto>();
            CreateMap<StoreKeeperDto, StoreKeeper>();

        }
    }
}
