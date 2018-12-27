using KMS.Staffing.Core.Contracts;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace KMS.Staffing.Logic
{
    public class ProjectsLogic : IProjectsLogic
    {
        readonly IProjectRepository projectRepository;

        public ProjectsLogic(IProjectRepository projectRepository)
        {
            this.projectRepository = projectRepository;
        }

        public string test(string name)
        {
            return $"Hello {name} at";
        }

        public int CountProjects()
        {
            return projectRepository.GetProjects().Count();            
        }
    }
}
