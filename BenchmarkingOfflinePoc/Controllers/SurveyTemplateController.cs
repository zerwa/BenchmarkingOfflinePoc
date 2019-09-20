using BenchmarkingOfflinePoc.Services;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace BenchmarkingOfflinePoc.Controllers
{
    [Route("api/survey-templates")]
    public class SurveyTemplateController : Controller
    {
        readonly SurveyTemplateService surveyTemplateService;

        public SurveyTemplateController(SurveyTemplateService surveyTemplateService)
        {
            this.surveyTemplateService = surveyTemplateService;
        }

        [HttpGet]
        public async Task<IActionResult> GetSurveyTemplates()
        {
            var templates = await surveyTemplateService.GetAllSurveyTemplates();

            return Json(templates);
        }
    }
}
