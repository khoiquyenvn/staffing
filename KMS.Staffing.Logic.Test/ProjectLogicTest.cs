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
        [Fact]
        public void FillEmployee_Success()
        {
            var projectRepo = new ProjectRepository();
            var employeeRepo = new EmployeeRepository();
            var projectStaffRepsitory = new ProjectStaffRepository();
            var sessionPlanRepository = new SessionPlanRepository();
            var requestRepository = new RequestRepository();


            var sut = new ProjectLogic(projectRepo, projectStaffRepsitory, employeeRepo, sessionPlanRepository,requestRepository);

            Guid projectId = Guid.Parse("46E90FD9-7FDA-494E-891F-03EE5EBF8BCE");
            Guid sessionPlanId = Guid.Parse("4E46C7F1-C9E1-4B4F-99C9-1C4BE2AECF51");
            var result = sut.Arrange(sessionPlanId);

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
