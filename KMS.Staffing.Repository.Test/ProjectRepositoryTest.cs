using KMS.Staffing.Core.Enums;
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

            var sessionPlans = sut
                .SessionPlans
                .Include("Requests.RequestDetails")
                .Where(x => x.Status == (int)PlanStatus.Active)
                .ToList();

            var activeRequests = sessionPlans
                .First()
                .Requests
                .Where(x => x.Status == (int)RequestStatus.Active)
                .ToList();

            var titleNeeds = activeRequests.Where(x => x.Type == (int)RequestType.Title).ToList();
            var bothNeeds = activeRequests.Where(x => x.Type == (int)RequestType.Both).ToList();

            //var requestTitlesInOrder = activeRequests
            //    .SelectMany(x => x.RequestDetails)
            //    .Select(x => new { x.Title.Name, x.TitleId, x.Title.Level, x.Request.Number })
            //    .OrderBy(x => x.Level)
            //    .Distinct()
            //    .ToList();

            var neededScore = CalNeededScore(titleNeeds, bothNeeds);

            var employees = sut.Employees.Include(nameof(Employee.EmployeeSkill)).ToList();

            var dic = new Dictionary<int, int>();

            activeRequests.ForEach(x =>
            {
                x.Candidates = new List<EmpScore>();
                var requestType = (RequestType)x.Type;
                
                employees.ForEach(e =>
                {
                    var score = 0;

                    score = e.CalScore(x);

                    if (score > 0)
                    {
                        x.Candidates.Add(new EmpScore { EmpId = e.Id, Score = score });
                    }
                });
            });

            Assert.NotNull(sessionPlans);
        }

        private int CalNeededScore(List<Request> titles, List<Request> titleAndSkills)
        {
            var scores = 0;

            scores += titles.Sum(x => x.Number);

            titleAndSkills.ForEach(x => {

                // add one score for title
                //scores += x.Number;

                // and one for each required skill
                scores += x.RequestDetails.Count * x.Number;
            });

            return scores;
        }

        [Fact]
        public void Insert_SE_FE()
        {
            var sut = StaffingContext.Instance;
            var titles = sut.Titles.ToList();
            var skills = sut.Skills.ToList();

            var feSkillIds = new List<Guid>
            {
                Guid.Parse("5C5DBEFA-1EF4-46A8-AF19-94BA540837A0"), // CSS
                Guid.Parse("120E768D-1FFD-4BFC-BE39-AB23170BDA74"), // HTML
                Guid.Parse("120E768D-1FFD-4BFC-BE39-AB23170BDA75")  // Javascript
            };

            var beSkillIds = new List<Guid>
            {
                Guid.Parse("120e768d-1ffd-4bfc-be39-ab23170bda72"), //c#
                Guid.Parse("120e768d-1ffd-4bfc-be39-ab23170bda73"), //SQL
                Guid.Parse("3fff3db1-9e8a-4913-a538-fa48744a7987"), //WebAPI
                Guid.Parse("16678924-48f8-4741-862d-36b225938006"), //Unit test
                Guid.Parse("d0617bb4-35c8-4d21-bc7b-67593c233dc2"), //Design DB
                Guid.Parse("323f65d2-25e1-40c2-94a2-7aa5524168ca") //ML
            };

            var feSkills = skills.Where(x => feSkillIds.Contains(x.Id)).ToList();
            var beSkills = skills.Where(x => beSkillIds.Contains(x.Id)).ToList();

            var empId = 3111;
            var index = 1;

            var titleIdSSE = titles.FirstOrDefault(x => x.Name.Equals("Senior Software Engineer")).Id;
            var titleIdQA = titles.FirstOrDefault(x => x.Name.Equals("QA Engineer")).Id;
            var titleIdSQA = titles.FirstOrDefault(x => x.Name.Equals("Senior QA Engineer")).Id;
            var titleIdBA = titles.FirstOrDefault(x => x.Name.Equals("Business Analyst")).Id;
            var titleIdSBA = titles.FirstOrDefault(x => x.Name.Equals("Senior Business Analyst")).Id;
            var titleIdEM = titles.FirstOrDefault(x => x.Name.Equals("Engineer Manager")).Id;
            var titleIdSEM = titles.FirstOrDefault(x => x.Name.Equals("Senior Engineer Manager")).Id;


            var random = new Random();

            var lstEmp = new List<Employee>();

            for (int i = 0; i < 100; i++)
            {
                lstEmp.Add(
                    //AddNew(titleIdQA, skills, empId, index, random.Next(1,feSkillIds.Count + 1), "SSE", "SSE FS")
                    AddNew(titleIdSEM, skills, empId, index, 0, "SEM", "SEM")
                );

                // increase counter
                empId++;
                index++;
            }

            sut.Employees.AddRange(lstEmp);
            sut.SaveChanges();
        }

        private Employee AddNew(
            Guid titleId, 
            List<Skill> feSkills, 
            int empId, 
            int index, 
            int numOfSkills,
            string nameWithoutSkill,
            string nameWithSkill)
        {

            var name = numOfSkills > 0 ? nameWithSkill : nameWithoutSkill;

            var newEmp = new Employee
            {
                Id = empId,
                Name = $"{name} {index}",
                TitleId = titleId,
                Photo = "default.png",
                Email = "TDB",
                Phone = "0901234567",
                Address = "Anywhere",
                EmployeeSkill = new List<EmployeeSkill>()
            };

            for (int i = 0; i < numOfSkills; i++)
            {
                newEmp.EmployeeSkill.Add(
                    new EmployeeSkill
                    {
                        Id = Guid.NewGuid(),
                        IsPrimary = true,
                        CompetentLevelId = Guid.Parse("0E3B823E-A2A7-4A50-8EDF-D29BD7A20231"),
                        ExperienceId = Guid.Parse("D3E92391-9BFB-440E-8527-AF51983CD634"),
                        SkillId = feSkills.Where(x => !newEmp.EmployeeSkill.Any(y => y.SkillId.Equals(x.Id))).ToList().GetRandom().Id
                    });
            }

            return newEmp;
        }

        [Fact]
        public void DynamicQuery()
        {
            var sut = new ProjectRepository();
            var requestId = Guid.Parse("d228568c-a402-427e-bdcf-2a5b7c199322");

            var inclusions = new List<string> { "SessionPlan", "RequestDetails" };

            var request = sut.Query<Request>(x => x.Id == requestId, inclusions).FirstOrDefault();

            Assert.NotNull(request);
        }
    }
}
