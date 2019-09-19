using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace BenchmarkingOfflinePoc.Models.Database
{
    public partial class MetricType
    {
        public MetricType()
        {
            SurveyMetricMetadata = new HashSet<SurveyMetricMetadata>();
            SystemMetric = new HashSet<SystemMetric>();
        }

        public int MetricTypeId { get; set; }
        [StringLength(50)]
        public string MetricTypeName { get; set; }

        [InverseProperty("MetricType")]
        public ICollection<SurveyMetricMetadata> SurveyMetricMetadata { get; set; }
        [InverseProperty("MetricType")]
        public ICollection<SystemMetric> SystemMetric { get; set; }
    }
}
