using KMS.Staffing.Core.Contracts;
using KMS.Staffing.Core.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace KMS.Staffing.Logic
{
    public class SkillLogic : ISkillLogic
    {
        readonly ISkillRepository skillRepository;

        public SkillLogic(ISkillRepository skillRepository)
        {
            this.skillRepository = skillRepository;
        }

        public List<Skill> GetSkills()
        {
            return skillRepository.GetSkills().ToList();
        }
    }
}
