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

        public ProjectLogic(IProjectRepository projectRepository,
                            IProjectStaffRepository projectStaffRepsitory,
                            IEmployeeRepository employeeRepository,
                            ISessionPlanRepository sessionPlanRepository,
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

            return projectStaff.GroupBy(x => x.PositionId).Select(gr => gr.ToList()).ToList();
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

            return Arrange(sessionPlans.FirstOrDefault());
        }

        public StaffingResult Arrange(SessionPlan sessionPlan)
        {
            sessionPlan = sessionPlan ?? new SessionPlan { Requests = new List<Request>() };

            var activeRequests = sessionPlan
                .Requests
                .Where(x => x.Status == (int)RequestStatus.Active)
                .ToList();

            var employees = employeeRepository.GetEmployees();

            var filler = new EmployeeFiller();

            return filler.FillEmp(activeRequests, employees);
        }

        public StaffingResult FindEmployeesForRequest(Guid requestId)
        {
            Request request = requestRepository.FindById(requestId);

            return FindEmployeesForRequest(request);
        }

        public SessionPlan FindSessionPlan(Guid sessionPlanId)
        {
            return sessionPlanRepository.FindById(sessionPlanId);
        }

        public Request FindRequest(Guid requestId)
        {
            return requestRepository.FindById(requestId);
        }

        public StaffingResult FindEmployeesForRequest(Request request)
        {
            Guid? requestTitleId = request.RequestDetails.FirstOrDefault()?.TitleId;

            var employees = employeeRepository
                .GetEmployees()
                .Where(x => x.TitleId.Equals(requestTitleId.GetValueOrDefault()))
                .ToList();

            var filler = new EmployeeFiller();

            var expectedScore = filler.CalExpectedScore(request) / request.Number;

            // update matched result for each employee
            employees.ForEach(
                x => x.MatchedResult = new MatchedResult
                {
                    MatchedRequest = requestTitleId.GetValueOrDefault(),
                    MatchedScore = x.CalScore(request),
                    RequestExpectedScore = expectedScore
                });

            // filter and sort employees by MatchedScore desc
            employees = employees
                .Where(x => x.MatchedResult.MatchedScore > 0)
                .OrderByDescending(x => x.MatchedResult.MatchedScore)
                .ToList();

            return new StaffingResult
            {
                Result = filler.ProjectMainProperties(employees),
                ExpectedResult = expectedScore,
                Fitness = CalculateFitness(employees, expectedScore)
            };
        }

        private int CalculateFitness(List<Employee> employees, int expectedScore)
        {
            var fitness = -expectedScore;
            if (employees.Any())
            {
                fitness = employees.First().MatchedResult.MatchedScore - expectedScore;
            }

            return fitness;
        }

        SessionResult IProjectLogic.GetAllRequestList(Guid sessionPlanId)
        {
            var requests =  this.requestRepository.getRequestList(sessionPlanId).ToList();
            
            var result = new SessionResult();
            if (requests != null && requests.Count() > 0)
            {
                result.Id = sessionPlanId;
                result.Requests = new List<RequestResult>();
                requests.ForEach(request => {
                    var requestResult = new RequestResult();
                    requestResult.Id = request.Id;
                    requestResult.Number = request.Number;
                    var skillIdList = request.RequestDetails.Select(detail => detail.SkillId).ToList();
                    requestResult.TitleId = request.RequestDetails.FirstOrDefault()?.TitleId;
                    requestResult.Skills = String.Join(";#", skillIdList);
                    result.Requests.Add(requestResult);
                });
            }

            return result;
        }
    }
}
