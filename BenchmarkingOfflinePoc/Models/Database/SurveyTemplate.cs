using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace BenchmarkingOfflinePoc.Models.Database
{
    public partial class SurveyTemplate
    {
        public SurveyTemplate()
        {
            Tab = new HashSet<Tab>();
        }

        public int SurveyTemplateId { get; set; }
        public int? FunctionId { get; set; }
        public int? Version { get; set; }

        [ForeignKey("FunctionId")]
        [InverseProperty("SurveyTemplate")]
        public Function Function { get; set; }
        [InverseProperty("SurveyTemplate")]
        public ICollection<Tab> Tab { get; set; }
    }
}
