using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using odMineContracting.Api.Repositories.Context;

namespace odMineContracting.Api.Repositories
{
    public class ClientRepository : IClientRepository
    {
        private readonly odMineContractingContext dbContext;
        private readonly IMapper mapper;

        public ClientRepository(
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
