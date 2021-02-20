using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using odMineContracting.Api.Services.Models;

namespace odMineContracting.Api.Repositories
{
    public interface ICityRepository
    {
        Task<IEnumerable<City>> GetAllAsync(CancellationToken cancellationToken);
    }
}
