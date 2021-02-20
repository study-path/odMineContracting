using System.Threading;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using odMineContracting.Api.Controllers.ViewModels;

namespace odMineContracting.Api.Controllers
{
    [Route("api/clients")]
    [ApiController]
    public class ClientsController : ControllerBase
    {
        [HttpGet]
        public async Task<IActionResult> GetAllAsync(CancellationToken cancellationToken)
        {
            return this.Ok(new string[] { "value1", "value2" });
        }

        [HttpGet("{id}")]
        public string Get(int id)
        {
            return "value";
        }

        [HttpPost]
        public async Task<IActionResult> PostAsync([FromBody] ClientViewModel model, CancellationToken cancellationToken)
        {
            return this.Ok();
        }

        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
