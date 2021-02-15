using Microsoft.AspNetCore.Mvc;
using odMineContracting.Api.Controllers.ViewModels;
using System.Collections.Generic;

namespace odMineContracting.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CitiesController : ControllerBase
    {
        [HttpGet]
        public IEnumerable<CityViewModel> Get()
        {
            return new CityViewModel[] {
                new CityViewModel{
                    Id = 1,
                    CityName = "Toronto",
                    Province = "ON"
                },
                new CityViewModel
                {
                    Id = 2,
                    CityName = "Vancouver",
                    Province = "BC"
                }
            };
        }
    }
}
