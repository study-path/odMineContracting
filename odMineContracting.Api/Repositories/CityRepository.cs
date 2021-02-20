using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.EntityFrameworkCore;
using odMineContracting.Api.Repositories.Context;
using odMineContracting.Api.Services.Models;

namespace odMineContracting.Api.Repositories
{
    public class CityRepository : ICityRepository
    {
        private readonly odMineContractingContext dbContext;
        private readonly IMapper mapper;

        public CityRepository(
            odMineContractingContext dbContext,
            IMapper mapper)
        {
            this.dbContext = dbContext;
            this.mapper = mapper;
        }

        public async Task<IEnumerable<City>> GetAllAsync(CancellationToken cancellationToken)
        {
            var result = await this.dbContext.Cities
                .AsNoTracking()
                .OrderBy(c => c.CityName)
                .ToListAsync(cancellationToken);

            return this.mapper.Map<IEnumerable<City>>(result);
        }
    }
}
