using AutoMapper;
using VehicleServer.DTOs;
using VehicleServer.Entities;

namespace VehicleServer.Profilee
{
    public class AutoMapperProfile: Profile
    {
        public AutoMapperProfile()
        {
            CreateMap<Item, ItemDTO>();
            CreateMap<ItemDTO, Item>();
            CreateMap<CategoryDTO, Category>();
            CreateMap<Category, CategoryDTO>();
            CreateMap<StoreDTO, Store>();
            CreateMap<Store, StoreDTO>();

  
        }
    }
    }

