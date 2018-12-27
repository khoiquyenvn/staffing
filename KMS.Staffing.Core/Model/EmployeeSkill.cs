using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace KMS.Staffing.Core.Model
{
    [Table("EmployeeSkill")]
    public class EmployeeSkill
    {
        public Guid Id { get; set; }
        [Key]
        [Column(Order = 2)]
        public int EmployeeId { get; set; }
        public bool IsPrimary { get; set; }
        [Key]
        [Column(Order = 4)]
        public Guid SkillId { get; set; }
        public Guid ExperienceId { get; set; }
        public Guid CompetentLevelId { get; set; }

        [ForeignKey(nameof(EmployeeId))]
        public virtual Employee Employee { get; set; }

        [ForeignKey(nameof(SkillId))]
        public virtual Skill Skill { get; set; }
    }
}
