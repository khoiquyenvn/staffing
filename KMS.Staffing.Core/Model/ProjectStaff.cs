using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace KMS.Staffing.Core.Model
{
    [Table("ProjectStaff")]
    public class ProjectStaff
    {
        [Key]
        public Guid Id { get; set; }

        public Guid ProjectId { get; set; }
        [ForeignKey(nameof(ProjectId))]
        public virtual Project Project { get; set; }

        public int EmployeeId { get; set; }
        [ForeignKey(nameof(EmployeeId))]
        public virtual Employee Employee { get; set; }

        public Guid PositionId { get; set; }
        [ForeignKey(nameof(PositionId))]
        public virtual ProjectStaffPosition Position { get; set; }
    }
}
