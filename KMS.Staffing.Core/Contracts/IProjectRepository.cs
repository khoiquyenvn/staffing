using KMS.Staffing.Core.Model;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace KMS.Staffing.Core.Contracts
{
    public interface IProjectRepository
    {
        int Add(Project project);
        int Update(Project project);
        int Delete(Guid id);

        IEnumerable<Project> GetProjects();
        Project FindById(Guid id);
    }
}
