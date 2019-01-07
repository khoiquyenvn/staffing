using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace KMS.Staffing.Core.Model
{
    [Table("ProjectStaffPosition")]
    public class ProjectStaffPosition
    {
        [Key]
        public Guid Id { get; set; }


        public String PositionName { get; set; }
        public String PositionShortName { get; set; }
    }
}
