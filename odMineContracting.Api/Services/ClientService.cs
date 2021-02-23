using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using odMineContracting.Api.Repositories;
using odMineContracting.Api.Services.Models;

namespace odMineContracting.Api.Services
{
    public class ClientService : IClientService
    {
        private readonly IClientRepository clientRepository;

        public ClientService(IClientRepository clientRepository)
        {
            this.clientRepository = clientRepository;
        }

        public async Task<IEnumerable<Client>> GetAllAsync(CancellationToken cancellationToken)
        {
            return await this.clientRepository.GetAllAsync(cancellationToken);
        }

        public async Task<int> CreateAsync(Client client, CancellationToken cancellationToken)
        {
            return await this.clientRepository.CreateAsync(client, cancellationToken);
        }

        public async Task<Client> GetAsync(int clientId, CancellationToken cancellationToken)
        {
            return await this.clientRepository.GetAsync(clientId, cancellationToken);
        }

        public async Task UpdateAsync(Client client, CancellationToken cancellationToken)
        {
            await this.clientRepository.UpdateAsync(client, cancellationToken);
        }

        public async Task DeleteAsync(int clientId, CancellationToken cancellationToken)
        {
            await this.clientRepository.DeleteAsync(clientId, cancellationToken);
        }
    }
}
