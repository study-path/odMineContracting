using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using odMineContracting.Api.Repositories;
using odMineContracting.Api.Services.Models;

namespace odMineContracting.Api.Services
{
    public class CityService : ICityService
    {
        private readonly ICityRepository cityRepository;

        public CityService(ICityRepository cityRepository)
        {
            this.cityRepository = cityRepository;
        }


        public async Task<IEnumerable<City>> GetAllAsync(CancellationToken cancellationToken)
        {
            return await this.cityRepository.GetAllAsync(cancellationToken);
        }
    }
}
