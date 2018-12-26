using KMS.Staffing.Core.Contracts;
using KMS.Staffing.Core.Model;
using KMS.Staffing.Repository.Contants;
using KMS.Staffing.Repository.DBContexts;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace KMS.Staffing.Repository.Repos
{
    public class EmployeeRepository : BaseRepository, IEmployeeRepository
    {
        readonly StaffingContext context;

        public EmployeeRepository()
        {
            context = new StaffingContext(GetConnectionString(""));
        }

        public IEnumerable<Employee> GetEmployees()
        {
            return context.Employees;
        }
    }
}
