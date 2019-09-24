using BenchmarkingOfflinePoc.Models.Database;
using BenchmarkingOfflinePoc.Services;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BenchmarkingOfflinePoc.Controllers
{
    [Route("api/survey-metrics")]
    public class SurveyMetricController : Controller
    {
        readonly SurveyTemplateService surveyTemplateService;

        public SurveyMetricController(SurveyTemplateService surveyTemplateService)
        {
            this.surveyTemplateService = surveyTemplateService;
        }

        [HttpGet]
        public async Task<IActionResult> GetSurveyMetrics()
        {
            var metrics = await surveyTemplateService.GetAllSurveyMetrics();

            return Json(metrics);
        }

        [HttpPost]
        public async Task<IActionResult> PostSurveyMetric([FromBody]SurveyMetric surveyMetric)
        {
            await surveyTemplateService.AddOrUpdateSurveyMetric(surveyMetric);
            //return Ok();
            return CreatedAtAction(nameof(SurveyMetric), nameof(SurveyMetricController), surveyMetric);
        }
    }
}