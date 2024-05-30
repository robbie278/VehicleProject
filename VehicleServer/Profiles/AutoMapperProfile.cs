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

            CreateMap<Item, ItemDto>();
            CreateMap<ItemDto, Item>();

            CreateMap<CategoryDto, Category>();
            CreateMap<Category, CategoryDto>();
            CreateMap<StoreDto, Store>();
            CreateMap<Store, StoreDto>();

            CreateMap<Stock, StockDto>().ReverseMap();

            CreateMap<StockTransaction, StockTransactionDto>();
            CreateMap<StockTransactionDto, StockTransaction>();
        }
    }
}
