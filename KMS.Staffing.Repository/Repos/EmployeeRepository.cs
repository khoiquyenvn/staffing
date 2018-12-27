using KMS.Staffing.Core.Contracts;
using KMS.Staffing.Core.Model;
using KMS.Staffing.Repository.Contants;
using KMS.Staffing.Repository.DBContexts;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace KMS.Staffing.Repository.Repos
{
    public class EmployeeRepository : BaseRepository, IEmployeeRepository
    {
        readonly StaffingContext context;
        private readonly string avatarPath = ConfigurationManager.AppSettings["avatarPath"];

        public EmployeeRepository()
        {
            context = new StaffingContext(GetConnectionString(""));
        }

        public List<Employee> GetEmployees()
        {
            var employees = context.Employees.ToList();

            employees.ForEach(e =>
            {
                e.DisplayId = e.Id.ToString("D" + 4); // Display ID as 4 digits
                e.PhotoURL = $"{avatarPath}{e.Photo}";
                e.Title = context.Titles.FirstOrDefault(t => t.Id.Equals(e.TitleId));
            });


            return employees;
        }
    }
}
