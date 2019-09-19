using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace BenchmarkingOfflinePoc.Models.Database
{
    public partial class Case
    {
        public int CaseId { get; set; }
        [Required]
        [StringLength(50)]
        public string CaseName { get; set; }
        [Required]
        [StringLength(5)]
        public string CaseCode { get; set; }
        public int? FunctionId { get; set; }

        [ForeignKey("FunctionId")]
        [InverseProperty("Case")]
        public Function Function { get; set; }
    }
}
