using KMS.Staffing.Core.Model;
using System.Collections.Generic;

namespace KMS.Staffing.Logic
{
    public interface IProjectLogic
    {
        string test(string name);

        int CountProjects();

        List<Project> GetProjects();
    }
}