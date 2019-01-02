using KMS.Staffing.Core.Contracts;
using KMS.Staffing.Core.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace KMS.Staffing.Logic
{
    public class CompetentLevelLogic : ICompetentLevelLogic
    {
        readonly ICompetentLevelRepository competentLevelRepository;

        public CompetentLevelLogic(ICompetentLevelRepository competentLevelRepository)
        {
            this.competentLevelRepository = competentLevelRepository;
        }

        public List<CompetentLevel> GetCompetentLevels()
        {
            return competentLevelRepository.GetCompetentLevels().ToList();
        }
    }
}
