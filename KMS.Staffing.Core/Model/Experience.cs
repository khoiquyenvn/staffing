using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace KMS.Staffing.Core.Model
{
    [Table("Experience")]
    public class Experience
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
    }
}
