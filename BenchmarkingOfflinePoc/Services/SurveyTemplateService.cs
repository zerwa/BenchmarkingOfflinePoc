using BenchmarkingOfflinePoc.Models.Database;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BenchmarkingOfflinePoc.Services
{
    public class SurveyTemplateService
    {
        readonly OfflinePocDb context;

        public SurveyTemplateService(OfflinePocDb offlinePocDb)
        {
            this.context = offlinePocDb;
        }

        public async Task<List<SurveyTemplate>> GetAllSurveyTemplates()
        {
            return await context.SurveyTemplate
                .Include(st => st.Tab)
                    .ThenInclude(t => t.Question)
                    .ThenInclude(q => q.SurveyMetricMetadata)
                        .ThenInclude(smm => smm.MetricType)
                .ToListAsync();
        }

        public async Task<List<SurveyMetric>> GetAllSurveyMetrics()
        {
            return await context.SurveyMetric
                .ToListAsync();
        }

        public async Task AddOrUpdateSurveyMetric(SurveyMetric surveyMetric)
        {
            if(surveyMetric.SurveyMetricId != 0)
            {
                context.SurveyMetric.Update(surveyMetric);
            }
            else
            {
                context.SurveyMetric.Add(surveyMetric);
            }

            await context.SaveChangesAsync();
        }
    }
}
