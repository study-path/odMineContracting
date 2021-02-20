using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using odMineContracting.Api.Services.Models;

namespace odMineContracting.Api.Services
{
    public interface ICityService
    {
        Task<IEnumerable<City>> GetAllAsync(CancellationToken cancellationToken);
    }
}
