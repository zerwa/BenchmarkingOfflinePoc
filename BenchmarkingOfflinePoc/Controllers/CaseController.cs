using System.Threading.Tasks;
using BenchmarkingOfflinePoc.Models.Database;
using BenchmarkingOfflinePoc.Services;
using Microsoft.AspNetCore.Mvc;

namespace BenchmarkingOfflinePoc.Controllers
{
	[Route("api/cases")]
	public class CaseController : Controller
	{
        readonly CaseService caseService;

        public CaseController(CaseService caseService)
        {
            this.caseService = caseService;
        }

		[HttpGet]
        public async Task<IActionResult> GetCases()
		{
            var cases = await caseService.GetCases();
            return Json(cases);
		}

        [HttpPost]
        public async Task<IActionResult> AddCase([FromBody] Case @case)
        {
            await caseService.AddCase(@case);
            return Ok();
        }
	}
}
