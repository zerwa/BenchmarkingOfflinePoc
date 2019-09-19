using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace BenchmarkingOfflinePoc.Models.Database
{
    public partial class Question
    {
        public int QuestionId { get; set; }
        public int? TabId { get; set; }
        public string QuestionMainText { get; set; }
        public string QuestionSubText { get; set; }
        public int? QuestionOrder { get; set; }
        public int? SurveyMetricMetadataId { get; set; }

        [ForeignKey("SurveyMetricMetadataId")]
        [InverseProperty("Question")]
        public SurveyMetricMetadata SurveyMetricMetadata { get; set; }
        [ForeignKey("TabId")]
        [InverseProperty("Question")]
        public Tab Tab { get; set; }
    }
}
