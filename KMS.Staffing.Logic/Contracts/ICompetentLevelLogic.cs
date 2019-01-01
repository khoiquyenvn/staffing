using KMS.Staffing.Core.Model;
using System.Collections.Generic;

namespace KMS.Staffing.Logic
{
    public interface ICompetentLevelLogic
    {
        List<CompetentLevel> GetCompetentLevels();
    }
}