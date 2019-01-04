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
        readonly IProjectStaffRepository projectStaffRepsitory;

        public ProjectLogic(IProjectRepository projectRepository, IProjectStaffRepository projectStaffRepsitory)
        {
            this.projectRepository = projectRepository;
            this.projectStaffRepsitory = projectStaffRepsitory;
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

        public List<ProjectStaff> GetAllEmployeeInProject(Guid projectId)
        {
            return projectStaffRepsitory.FindAllEmployee(projectId).ToList();
        }
    }
}
