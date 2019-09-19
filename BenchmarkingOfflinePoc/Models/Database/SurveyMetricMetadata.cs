using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace BenchmarkingOfflinePoc.Models.Database
{
    public partial class SurveyMetricMetadata
    {
        public SurveyMetricMetadata()
        {
            Question = new HashSet<Question>();
            SurveyMetric = new HashSet<SurveyMetric>();
        }

        public int SurveyMetricMetadataId { get; set; }
        [StringLength(50)]
        public string SurveyMetricName { get; set; }
        public int? MetricTypeId { get; set; }
        public int? SystemMetricId { get; set; }

        [ForeignKey("MetricTypeId")]
        [InverseProperty("SurveyMetricMetadata")]
        public MetricType MetricType { get; set; }
        [ForeignKey("SystemMetricId")]
        [InverseProperty("SurveyMetricMetadata")]
        public SystemMetric SystemMetric { get; set; }
        [InverseProperty("SurveyMetricMetadata")]
        public ICollection<Question> Question { get; set; }
        [InverseProperty("SurveyMetricMetadata")]
        public ICollection<SurveyMetric> SurveyMetric { get; set; }
    }
}
