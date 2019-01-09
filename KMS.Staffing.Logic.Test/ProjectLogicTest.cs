using KMS.Staffing.Core.Contracts;
using KMS.Staffing.Core.Model;
using KMS.Staffing.Repository.DBContexts;
using KMS.Staffing.Repository.Repos;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Xunit;

namespace KMS.Staffing.Logic.Test
{
    public class ProjectLogicTest : LogicTestBase
    {
        readonly IProjectRepository projectRepo;
        readonly IEmployeeRepository employeeRepo;
        readonly IProjectStaffRepository projectStaffRepsitory;
        readonly ISessionPlanRepository sessionPlanRepository;
        readonly IRequestRepository requestRepository;

        public ProjectLogicTest() : base()
        {
            fixture.Register(projectRepo = new ProjectRepository());
            fixture.Register(employeeRepo = new EmployeeRepository());
            fixture.Register(projectStaffRepsitory = new ProjectStaffRepository());
            fixture.Register(sessionPlanRepository = new SessionPlanRepository());
            fixture.Register(requestRepository = new RequestRepository());
        }

        [Fact]
        public void FillEmployee_Success()
        {            
            var sut = fixture.Resolve<ProjectLogic>();
            
            Guid sessionPlanId = Guid.Parse("4E46C7F1-C9E1-4B4F-99C9-1C4BE2AECF51");
            var result = sut.Arrange(sessionPlanId);

            Assert.NotNull(result);
        }

        [Fact]
        public void FillEmployee_By_Request_Success()
        {
            var sut = fixture.Resolve<ProjectLogic>();

            Guid requestId = Guid.Parse("d228568c-a402-427e-bdcf-2a5b7c199322");

            var result = sut.FindEmployeesForRequest(requestId);

            Assert.NotNull(result);
        }

        [Fact]
        public void CompareEmpScore()
        {
            var es1 = new EmpScore { EmpId = 1, Score = 1 };

            var es2 = new EmpScore { EmpId = 2, Score = 1 };

            var es3 = new EmpScore { EmpId = 3, Score = 2 };

            Assert.True(es1.Equals(es2));
            Assert.False(es1.Equals(es3));
        }
    }
}
