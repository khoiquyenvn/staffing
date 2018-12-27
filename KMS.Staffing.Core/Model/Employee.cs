using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace KMS.Staffing.Core.Model
{
    [Table("Employee")]
    public class Employee
    {
        [Key]
        public int Id { get; set; }
        public string Name { get; set; }
        public string Photo { get; set; }
        public string Email { get; set; }
        public string Phone { get; set; }
        public string Address { get; set; }
        public Guid TitleId { get; set; }
        public Title Title { get; set; }

        [NotMapped]
        public string DisplayId { get; set; }

        [NotMapped]
        public string PhotoURL { get; set; }
        public virtual ICollection<EmployeeSkill> EmployeeSkill { get; set; }
    }
}
