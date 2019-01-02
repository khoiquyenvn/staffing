using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace KMS.Staffing.Core.Model
{
    [Table("Project")]
    public class Project
    {        
        public Guid Id { get; set; }

        public string Name { get; set; }

        public string Client { get; set; }

        public string Photo { get; set; }

        public string Description { get; set; }

        public int TeamSize { get; set; }

        public Guid DepartmentId { get; set; }

        public int Status { get; set; }

        public virtual List<SessionPlan> SessionPlans { get; set; }
    }
}
