namespace odMineContracting.Api.Services.Models
{
    public class Client
    {
        public int? Id { get; set; }

        public string Name { get; set; }

        public string Address1 { get; set; }

        public string Address2 { get; set; }

        public string PostalCode { get; set; }

        public string ContactName { get; set; }

        public string ContactPhone { get; set; }

        public string ContactEmail { get; set; }

        public int CityId { get; set; }

        public string CityName { get; set; }
    }
}
