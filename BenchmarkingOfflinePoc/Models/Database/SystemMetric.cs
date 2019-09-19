using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace BenchmarkingOfflinePoc.Models.Database
{
    public partial class SystemMetric
    {
        public SystemMetric()
        {
            SurveyMetricMetadata = new HashSet<SurveyMetricMetadata>();
        }

        public int SystemMetricId { get; set; }
        [StringLength(50)]
        public string SystemMetricName { get; set; }
        [StringLength(50)]
        public string SystemMetricDisplayName { get; set; }
        public int? MetricTypeId { get; set; }

        [ForeignKey("MetricTypeId")]
        [InverseProperty("SystemMetric")]
        public MetricType MetricType { get; set; }
        [InverseProperty("SystemMetric")]
        public ICollection<SurveyMetricMetadata> SurveyMetricMetadata { get; set; }
    }
}
