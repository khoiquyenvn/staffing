using KMS.Staffing.Core.Contracts;
using KMS.Staffing.Core.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace KMS.Staffing.Logic
{
    public class ProjectLogic : IProjectLogic
    {
        readonly IProjectRepository projectRepository;

        public ProjectLogic(IProjectRepository projectRepository)
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

        public List<Project> GetProjects()
        { 
            return projectRepository.GetProjects().ToList();
        }

        public Project GetProjectDetail(Guid projectId)
        {
            return projectRepository.FindById(projectId);
        }
    }
}
