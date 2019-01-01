using KMS.Staffing.Core.Contracts;
using KMS.Staffing.Core.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace KMS.Staffing.Logic
{
    public class ExperienceLogic : IExperienceLogic
    {
        readonly IExperienceRepository experienceRepository;

        public ExperienceLogic(IExperienceRepository experienceRepository)
        {
            this.experienceRepository = experienceRepository;
        }

        public List<Experience> GetExperiences()
        {
            return experienceRepository.GetExperiences().ToList();
        }
    }
}
