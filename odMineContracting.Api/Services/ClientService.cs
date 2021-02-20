using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
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
    }
}
