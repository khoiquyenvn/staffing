using GeneticSharp.Domain;
using GeneticSharp.Domain.Populations;
using GeneticSharp.Extensions.Mathematic;
using GeneticSharp.Runner.ConsoleApp.Samples;
using KMS.Staffing.Core.Contracts;
using KMS.Staffing.Core.Enums;
using KMS.Staffing.Core.Model;
using KMS.Staffing.Core.Model.ApiResponse;
using KMS.Staffing.Logic.Bussiness;
using System;
using System.Collections.Generic;
using System.Linq;

namespace KMS.Staffing.Logic
{
    public class ProjectLogic : IProjectLogic
    {
        readonly IProjectRepository projectRepository;
        readonly IEmployeeRepository employeeRepository;


        public ProjectLogic(IProjectRepository projectRepository, IEmployeeRepository employeeRepository)
        {
            this.projectRepository = projectRepository;
            this.employeeRepository = employeeRepository;
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
    }
}
