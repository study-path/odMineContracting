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
        }
    }
}
