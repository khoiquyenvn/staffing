using KMS.Staffing.Core.Contracts;
using KMS.Staffing.Core.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace KMS.Staffing.Logic
{
    public class SkillCategoryLogic : ISkillCategoryLogic
    {
        readonly ISkillCategoryRepository skillCategoryRepository;

        public SkillCategoryLogic(ISkillCategoryRepository skillCategoryRepository)
        {
            this.skillCategoryRepository = skillCategoryRepository;
        }

        public List<SkillCategory> GetSkillCategories()
        {
            return skillCategoryRepository.GetSkillCategories().ToList();
        }
    }
}
