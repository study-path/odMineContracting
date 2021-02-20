using System;
using System.Collections.Generic;

namespace odMineContracting.Api.Repositories.Context.Models
{
    public class City
    {
        public int Id { get; set; }

        public string CityName { get; set; }

        public string ProvinceName { get; set; }

        public ICollection<Client> Clients { get; set; }
    }
}
