using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace BenchmarkingOfflinePoc.Models.Database
{
    public partial class Tab
    {
        public Tab()
        {
            Question = new HashSet<Question>();
        }

        public int TabId { get; set; }
        public int? SurveyTemplateId { get; set; }
        [StringLength(50)]
        public string TabName { get; set; }
        public int? TabOrder { get; set; }

        [ForeignKey("SurveyTemplateId")]
        [InverseProperty("Tab")]
        public SurveyTemplate SurveyTemplate { get; set; }
        [InverseProperty("Tab")]
        public ICollection<Question> Question { get; set; }
    }
}
