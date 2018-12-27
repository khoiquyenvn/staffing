using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace KMS.Staffing.Core.Model
{
    [Table("Skill")]
    public class Skill
    {        
        [Key]
        public Guid Id { get; set; }
        public string Name { get; set; }
        public Guid CategoryId { get; set; }

        public virtual ICollection<EmployeeSkill> EmployeeSkill { get; set; }

        [ForeignKey(nameof(CategoryId))]
        public virtual SkillCategory SkillCategory { get; set; }
    }
}
