using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using odMineContracting.Api.Services.Models;

namespace odMineContracting.Api.Repositories
{
    public interface IClientRepository
    {
        Task<IEnumerable<Client>> GetAllAsync(CancellationToken cancellationToken);
    }
}
