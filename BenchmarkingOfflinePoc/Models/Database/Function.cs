using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace BenchmarkingOfflinePoc.Models.Database
{
    public partial class Function
    {
        public Function()
        {
            Case = new HashSet<Case>();
            SurveyTemplate = new HashSet<SurveyTemplate>();
        }

        public int FunctionId { get; set; }
        [StringLength(50)]
        public string FunctionName { get; set; }
        [StringLength(50)]
        public string FunctionDisplayName { get; set; }

        [InverseProperty("Function")]
        public ICollection<Case> Case { get; set; }
        [InverseProperty("Function")]
        public ICollection<SurveyTemplate> SurveyTemplate { get; set; }
    }
}
