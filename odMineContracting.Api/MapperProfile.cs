using AutoMapper;
using odMineContracting.Api.Controllers.ViewModels;
using odMineContracting.Api.Services.Models;
using Repo = odMineContracting.Api.Repositories.Context.Models;

namespace odMineContracting.Api
{
    public class MapperProfile : Profile
    {
        public MapperProfile()
        {
            this.CreateMap<City, CityViewModel>();

            this.CreateMap<Repo.City, City>();

            this.CreateMap<Client, ClientViewModel>()
                .ReverseMap();

            this.CreateMap<Repo.Client, Client>()
                .ForMember(dest => dest.CityId, opt => opt.MapFrom(src => src.City.Id))
                .ForMember(dest => dest.CityName, opt => opt.MapFrom(src => $"{src.City.CityName}, {src.City.ProvinceName}"))
                .ReverseMap()
                .ForMember(dest => dest.City, src => src.Ignore());
        }
    }
}
