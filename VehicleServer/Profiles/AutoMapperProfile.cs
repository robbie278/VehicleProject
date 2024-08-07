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

            // modifing the item to include plate pool
            CreateMap<Item, ItemDto>();
            CreateMap<ItemDto, Item>();
                

            CreateMap<CategoryDto, Category>();
            CreateMap<Category, CategoryDto>();
            CreateMap<StoreDto, Store>();
            CreateMap<Store, StoreDto>();

            CreateMap<Stock, StockDto>().ReverseMap();

            CreateMap<StockTransaction, StockTransactionDto>()
                // this for plate pool relation while casting z dto
                .ForMember(dest => dest.PlatePool, opt => opt.MapFrom(src => src.PlatePools))
                .ReverseMap()
                .ForMember(dest => dest.PlatePools, opt => opt.MapFrom(src => src.PlatePool));


            CreateMap<StockTransactionDto, StockTransaction>();

            // plate mapping
            CreateMap<PlatePool, PlatePoolDto>()
                .ReverseMap();

        }
    }
}
