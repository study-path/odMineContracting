using Microsoft.EntityFrameworkCore;
using odMineContracting.Api.Repositories.Context.Models;

namespace odMineContracting.Api.Repositories.Context
{
    public class odMineContractingContext : DbContext
    {
        public odMineContractingContext(DbContextOptions<odMineContractingContext> options)
            : base(options)
        {
        }

        public DbSet<City> Cities { get; set; }

        public DbSet<Client> Clients { get; set; }
    }
}
