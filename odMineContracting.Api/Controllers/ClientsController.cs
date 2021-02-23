using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using odMineContracting.Api.Controllers.ViewModels;
using odMineContracting.Api.Services;
using odMineContracting.Api.Services.Models;

namespace odMineContracting.Api.Controllers
{
    [Route("api/clients")]
    [ApiController]
    public class ClientsController : ControllerBase
    {
        private readonly IClientService clientService;
        private readonly IMapper mapper;

        public ClientsController(
            IClientService clientService,
            IMapper mapper)
        {
            this.clientService = clientService;
            this.mapper = mapper;
        }

        /// <summary>
        /// Get all clients
        /// </summary>
        [HttpGet]
        public async Task<IActionResult> GetAllAsync(CancellationToken cancellationToken)
        {
            var result = await this.clientService.GetAllAsync(cancellationToken);
            return this.Ok(this.mapper.Map<IEnumerable<ClientViewModel>>(result));
        }

        /// <summary>
        /// Get specific client
        /// </summary>
        [HttpGet("{clientId:int}/details")]
        public async Task<IActionResult> Get(int clientId, CancellationToken cancellationToken)
        {
            var result = await this.clientService.GetAsync(clientId, cancellationToken);
            if (result != null)
            {
                return this.Ok(this.mapper.Map<ClientViewModel>(result));
            }
            else
            {
                return this.NotFound();
            }
            
        }

        /// <summary>
        /// Create new client
        /// </summary>
        [HttpPost]
        public async Task<IActionResult> PostAsync([FromBody] ClientViewModel model, CancellationToken cancellationToken)
        {
            var clientId = await this.clientService
                .CreateAsync(this.mapper.Map<Client>(model), cancellationToken);
            return this.Created($"/api/clients/{clientId}/details", clientId);
        }

        /// <summary>
        /// Update client
        /// </summary>
        [HttpPut("{clientId:int}")]
        public async Task<IActionResult> PutAsync(int clientId, [FromBody] ClientViewModel model, CancellationToken cancellationToken)
        {
            if (clientId != model.Id)
            {
                return this.BadRequest("The client Id in route does not correspond to client id in the model");
            }

            await this.clientService.UpdateAsync(this.mapper.Map<Client>(model), cancellationToken);
            return this.NoContent();
        }

        /// <summary>
        /// Client, bye bye )
        /// </summary>
        /// <param name="clientId"></param>
        /// <param name="cancellationToken"></param>
        /// <returns></returns>
        [HttpDelete("{clientId:int}")]
        public async Task<IActionResult> DeleteAsync(int clientId, CancellationToken cancellationToken)
        {
            await this.clientService.DeleteAsync(clientId, cancellationToken);
            return this.NoContent();
        }
    }
}
