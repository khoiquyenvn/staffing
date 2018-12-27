using KMS.Staffing.Core.Contracts;
using KMS.Staffing.Core.Model;
using KMS.Staffing.Core.Model.ApiRequest;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace KMS.Staffing.Logic
{
    public class EmployeesLogic : IEmployeesLogic
    {
        readonly IEmployeeRepository employeeRepository;        

        public EmployeesLogic(IEmployeeRepository employeeRepository)
        {
            this.employeeRepository = employeeRepository;
        }

        public List<Employee> GetEmployees(EmployeePageRequest pageRequest)
        {
            return employeeRepository.GetEmployees(pageRequest);
        }
    }
}
