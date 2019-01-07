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
        readonly ISessionPlanRepository sessionPlanRepository;

        readonly IEmployeeRepository employeeRepository;

        public ProjectLogic(IProjectRepository projectRepository, IProjectStaffRepository projectStaffRepsitory,
                            IEmployeeRepository employeeRepository, ISessionPlanRepository sessionPlanRepository)
        {
            this.projectRepository = projectRepository;
            this.projectStaffRepsitory = projectStaffRepsitory;
            this.employeeRepository = employeeRepository;
            this.sessionPlanRepository = sessionPlanRepository;
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

        public List<List<ProjectStaff>> GetAllEmployeeInProject(Guid projectId)
        {
            var projectStaff = projectStaffRepsitory.FindAllEmployee(projectId).ToList();

            var employeeList = projectStaff.Select(x => x.Employee).ToList();
            employeeRepository.UpdateAdditionalDetail(employeeList);

            return projectStaff.GroupBy(x => x.PositionId).Select(gr=> gr.ToList()).ToList();
        }

        public List<SessionPlan> GetAllSessionPlanList(Guid projectId)
        {
            return sessionPlanRepository.FindAllSessionPlan(projectId).ToList();
        }
    }
}
