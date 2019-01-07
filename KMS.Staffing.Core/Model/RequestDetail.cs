using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace KMS.Staffing.Core.Model
{
    [Table("RequestDetail")]
    public class RequestDetail
    {
        [Key]
        public Guid Id { get; set; }
        public Guid TitleId { get; set; }
        public Guid? SkillId { get; set; }
        public Guid CompetentLevelId { get; set; }
        public Guid RequestId { get; set; }

        [ForeignKey(nameof(SkillId))]
        public virtual Skill Skill { get; set; }

        [ForeignKey(nameof(TitleId))]
        public virtual Title Title { get; set; }

        [ForeignKey(nameof(RequestId))]
        public virtual Request Request { get; set; }
    }
}
