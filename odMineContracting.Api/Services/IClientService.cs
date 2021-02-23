using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using odMineContracting.Api.Services.Models;

namespace odMineContracting.Api.Services
{
    public interface IClientService
    {
        Task<IEnumerable<Client>> GetAllAsync(CancellationToken cancellationToken);

        Task<int> CreateAsync(Client client, CancellationToken cancellationToken);

        Task<Client> GetAsync(int clientId, CancellationToken cancellationToken);

        Task UpdateAsync(Client client, CancellationToken cancellationToken);
        
        Task DeleteAsync(int clientId, CancellationToken cancellationToken);
    }
}
