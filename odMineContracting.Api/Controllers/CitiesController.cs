using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using odMineContracting.Api.Controllers.ViewModels;
using odMineContracting.Api.Services;

namespace odMineContracting.Api.Controllers
{
    [Route("api/cities")]
    [ApiController]
    public class CitiesController : ControllerBase
    {
        private readonly ICityService cityService;
        private readonly IMapper mapper;

        public CitiesController(
            ICityService cityService,
            IMapper mapper)
        {
            this.cityService = cityService;
            this.mapper = mapper;
        }

        /// <summary>
        /// Get all cities
        /// </summary>
        [HttpGet]
        public async Task<IActionResult> GetAllAsync(CancellationToken cancellationToken)
        {
            var result = await this.cityService.GetAllAsync(cancellationToken);
            return this.Ok(this.mapper.Map<IEnumerable<CityViewModel>>(result));
        }
    }
}
