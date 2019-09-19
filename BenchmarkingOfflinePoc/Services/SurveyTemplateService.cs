﻿using BenchmarkingOfflinePoc.Models.Database;
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
            context = offlinePocDb;
        }

        public async Task<List<SurveyTemplate>> GetAllSurveyTemplates()
        {
            return await context.SurveyTemplate
                .Include(st => st.Tab)
                .ThenInclude(t => t.Question)
                .ThenInclude(q => q.SurveyMetricMetadata)
                .ToListAsync();
        }
    }
}
