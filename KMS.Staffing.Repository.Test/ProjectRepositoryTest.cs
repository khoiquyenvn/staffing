using KMS.Staffing.Core.Model;
using KMS.Staffing.Repository.Contants;
using KMS.Staffing.Repository.DBContexts;
using KMS.Staffing.Repository.Repos;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Xunit;

namespace KMS.Staffing.Repository.Test
{
    public class ProjectRepositoryTest
    {
        readonly string conn = ConfigurationManager.ConnectionStrings[StaffingKey.ConnectionString].ConnectionString;

        public ProjectRepositoryTest()
        {
            StaffingContext.Init(conn);
        }

        [Fact]
        public void AddNewProject_Success()
        {
            var sut = new ProjectRepository();

            var newProjectId = Guid.NewGuid();

            var newProject = new Project
            {
                Id = newProjectId,
                Client = "KMS",
                DepartmentId = Guid.Parse("bbe8cb8d-4248-4dc2-b5d3-ead7aa783b08"),
                Description = "Desc",
                Name = "KMS Staffing",
                Status = 1,
                TeamSize = 3
            };

            var result = sut.Add(newProject);
            Assert.Equal(1, result);

            var savedProject = sut.FindById(newProjectId);
            Assert.Equal("KMS Staffing", savedProject.Name);

            sut.Delete(newProjectId);
        }

        [Fact]
        public void GetProjects_Success()
        {
            var sut = StaffingContext.Instance;

            for (int i = 0; i < 10; i++)
            {
                var list = sut.Projects.ToList();
            }

            Assert.NotNull(sut);
        }

        [Fact]
        public void JoinTwoTable_Success()
        {
            var sut = StaffingContext.Instance;
            var projectInfo = from p in sut.Projects
                              join d in sut.Departments on p.DepartmentId equals d.Id
                              select new { Project = p, DepartmentName = d.Name };

            Assert.Equal("DEV", projectInfo.First().DepartmentName);
        }

        [Fact]
        public void ExecStoredProc_Success()
        {
            var sut = StaffingContext.Instance;
            var storedNameWithParam = "usp_SP1 @p1";
            var param = new SqlParameter("@p1", 1);
            
            var result = sut.Database.SqlQuery<Project>(storedNameWithParam, param).ToList();

            Assert.True(result.Count > 0);
        }

        [Fact]
        public void JoinManyToMany_LazyLoad()
        {
            var sut = StaffingContext.Instance;

            var emps = sut.Employees.ToList();
            var skills = sut.Skills.ToList();

            Assert.NotNull(emps);
            Assert.NotNull(skills);
        }

        [Fact]
        public void JoinManyToMany_EagerLoad()
        {
            var sut = StaffingContext.Instance; 

            var emps = 
                sut.Employees
                .Include("EmployeeSkill.Skill")
                .Include("EmployeeSkill.Employee")
                .Include("EmployeeSkill.Skill.SkillCategory")
                .ToList();

            var skills = sut.Skills.ToList();

            Assert.NotNull(emps);
            Assert.NotNull(skills);
        }

        [Fact]
        public void ProjectNeedToStaff()
        {
            var sut = StaffingContext.Instance;
                        

            var skills = sut.Skills.ToList();
            
            Assert.NotNull(skills);
        }
    }
}
