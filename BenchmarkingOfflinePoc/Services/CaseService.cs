using BenchmarkingOfflinePoc.Models.Database;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BenchmarkingOfflinePoc.Services
{
    public class CaseService
    {
        readonly OfflinePocDb context;

        public CaseService(OfflinePocDb offlinePocDb)
        {
            this.context = offlinePocDb;
        }

        public async Task<List<Case>> GetCases()
        {
            return await context.Case.ToListAsync();
        }

        public async Task AddCase(string caseName, string caseCode)
        {
            await AddCase(new Case()
            {
                CaseName = caseName,
                CaseCode = caseCode
            });
        }

        public async Task AddCase(Case @case)
        {
            context.Case.Add(@case);

            await context.SaveChangesAsync();
        }
    }
}
