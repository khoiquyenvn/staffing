using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace KMS.Staffing.Core.Model
{
    [Table("Request")]
    public class Request
    {
        [Key]
        public Guid Id { get; set; }
        public int Type { get; set; }
        public int Number { get; set; }
        public Guid SessionPlanId { get; set; }
        public int Status { get; set; }

        [ForeignKey(nameof(SessionPlanId))]
        public virtual SessionPlan SessionPlan { get; set; }

        public virtual List<RequestDetail> RequestDetails { get; set; }        
    }
}
