using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace BenchmarkingOfflinePoc.Models.Database
{
    public partial class SurveyMetric
    {
        public int SurveyMetricId { get; set; }
        public int? SurveyMetricMetadataId { get; set; }
        public double? NumberValue { get; set; }
        [Column(TypeName = "datetime")]
        public DateTime? DateValue { get; set; }
        public bool? BooleanValue { get; set; }
        [Column("TEXT_VALUE")]
        public string TextValue { get; set; }

        [ForeignKey("SurveyMetricMetadataId")]
        [InverseProperty("SurveyMetric")]
        public SurveyMetricMetadata SurveyMetricMetadata { get; set; }
    }
}
