using KMS.Staffing.Logic.Bussiness;
using KMS.Staffing.Repository.Repos;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Xunit;

namespace KMS.Staffing.Logic.Test
{
    public class ProjectLogicTest
    {
        [Fact]
        public void FillEmployee_Success()
        {
            var projectRepo = new ProjectRepository();
            var employeeRepo = new EmployeeRepository();
            var sut = new ProjectLogic(projectRepo, employeeRepo);

            Guid projectId = Guid.NewGuid();
            var result = sut.FillEmp(projectId);

            Assert.Equal(1, result);
        }

        [Fact]
        public void CompareEmpScore()
        {
            var es1 = new EmpScore { EmpId = Guid.NewGuid(), Score = 1 };

            var es2 = new EmpScore { EmpId = Guid.NewGuid(), Score = 1 };

            var es3 = new EmpScore { EmpId = Guid.NewGuid(), Score = 2 };

            Assert.True(es1.Equals(es2));
            Assert.False(es1.Equals(es3));
        }
    }
}
