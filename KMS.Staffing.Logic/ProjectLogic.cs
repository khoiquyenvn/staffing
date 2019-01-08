using GeneticSharp.Domain;
using GeneticSharp.Domain.Populations;
using GeneticSharp.Extensions.Mathematic;
using GeneticSharp.Runner.ConsoleApp.Samples;
using KMS.Staffing.Core.Contracts;
using KMS.Staffing.Core.Enums;
using KMS.Staffing.Core.Model;
using KMS.Staffing.Core.Model.ApiResponse;
using KMS.Staffing.Logic.Bussiness;
using KMS.Staffing.Logic.Bussiness.Result;
using System;
using System.Collections.Generic;
using System.Linq;

namespace KMS.Staffing.Logic
{
    public class ProjectLogic : IProjectLogic
    {
        readonly IProjectRepository projectRepository;
        readonly IProjectStaffRepository projectStaffRepsitory;
        readonly ISessionPlanRepository sessionPlanRepository;
        readonly IEmployeeRepository employeeRepository;
        readonly IRequestRepository requestRepository;

        public ProjectLogic(IProjectRepository projectRepository, IProjectStaffRepository projectStaffRepsitory,
                            IEmployeeRepository employeeRepository, ISessionPlanRepository sessionPlanRepository,
                            IRequestRepository requestRepository)
        {
            this.projectRepository = projectRepository;
            this.projectStaffRepsitory = projectStaffRepsitory;
            this.employeeRepository = employeeRepository;
            this.sessionPlanRepository = sessionPlanRepository;
            this.requestRepository = requestRepository;
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

        public StaffingResult Arrange(Guid sessionPlanId)
        {
            var sessionPlans = projectRepository
                .GetSessionPlans(projectId: null)
                .Where(x => x.Id == sessionPlanId && x.Status == (int)PlanStatus.Active)
                .ToList();

            var employees = employeeRepository.GetEmployees();

            var filler = new EmployeeFiller();

            return filler.FillEmp(sessionPlanId, sessionPlans, employees);
        }

        SessionResult IProjectLogic.GetAllRequestList(Guid sessionPlanId)
        {
            var requests =  this.requestRepository.getRequestList(sessionPlanId).ToList();
            
            var result = new SessionResult();
            if (requests != null && requests.Count() > 0)
            {
                result.Id = sessionPlanId;
                result.requests = new List<RequestResult>();
                requests.ForEach(request => {
                    var requestResult = new RequestResult();
                    requestResult.Id = request.Id;
                    requestResult.Number = request.Number;
                    var skillIdList = request.RequestDetails.Select(detail => detail.SkillId).ToList();
                    requestResult.TitleId = request.RequestDetails.FirstOrDefault()?.TitleId;
                    requestResult.SkillId = String.Join(";#", skillIdList);
                    result.requests.Add(requestResult);
                });
            }

            return result;
        }
    }
}
