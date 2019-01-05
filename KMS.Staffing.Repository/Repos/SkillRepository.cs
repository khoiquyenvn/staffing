using KMS.Staffing.Core.Contracts;
using KMS.Staffing.Core.Model;
using KMS.Staffing.Repository.Contants;
using KMS.Staffing.Repository.DBContexts;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace KMS.Staffing.Repository.Repos
{
    public class SkillRepository : BaseRepository, ISkillRepository
    {
        public SkillRepository()
        {
        }

        public List<Skill> GetSkills()
        {
            return Context.Skills.ToList();
        }
    }
}
