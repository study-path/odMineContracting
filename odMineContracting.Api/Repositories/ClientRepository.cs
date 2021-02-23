using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.EntityFrameworkCore;
using odMineContracting.Api.Repositories.Context;
using odMineContracting.Api.Services.Models;

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

        public async Task<IEnumerable<Client>> GetAllAsync(CancellationToken cancellationToken)
        {
            var result = await this.dbContext.Clients
                .Include(c => c.City)
                .AsNoTracking()
                .ToListAsync(cancellationToken);

            return this.mapper.Map<IEnumerable<Client>>(result);
        }

        public async Task<int> CreateAsync(Client client, CancellationToken cancellationToken)
        {
            var entityToAdd = this.mapper.Map<Context.Models.Client>(client);

            var addedEntity = await this.dbContext.Clients.AddAsync(entityToAdd, cancellationToken);

            await this.dbContext.SaveChangesAsync(cancellationToken);

            return addedEntity.Entity.Id.Value;
        }

        public async Task<Client> GetAsync(int clientId, CancellationToken cancellationToken)
        {
            var result = await this.dbContext.Clients
                .Include(c => c.City)
                .AsNoTracking()
                .FirstOrDefaultAsync(c => c.Id == clientId, cancellationToken);

            return this.mapper.Map<Client>(result);
        }

        public async Task UpdateAsync(Client client, CancellationToken cancellationToken)
        {
            var sourceEntity = this.mapper.Map<Context.Models.Client>(client);

            var destinationEntity = await this.dbContext.Clients
                .FirstOrDefaultAsync(c => c.Id == client.Id, cancellationToken);

            this.dbContext.Entry(destinationEntity).CurrentValues.SetValues(sourceEntity);

            await this.dbContext.SaveChangesAsync(cancellationToken);
        }

        public async Task DeleteAsync(int clientId, CancellationToken cancellationToken)
        {
            var entity = new Context.Models.Client
            {
                Id = clientId
            };
            this.dbContext.Clients.Attach(entity);
            this.dbContext.Clients.Remove(entity);
            await this.dbContext.SaveChangesAsync(cancellationToken);
        }
    }
}
