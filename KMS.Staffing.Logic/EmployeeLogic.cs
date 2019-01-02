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
    public class EmployeeLogic : IEmployeeLogic
    {
        readonly IEmployeeRepository employeeRepository;        

        public EmployeeLogic(IEmployeeRepository employeeRepository)
        {
            this.employeeRepository = employeeRepository;
        }

        public List<Employee> LoadEmployees(EmployeePageRequest pageRequest)
        {
            return employeeRepository.LoadEmployees(pageRequest);
        }

        public Employee GetEmployee(int? employeeId)
        {
            return employeeRepository.GetEmployee(employeeId);
        }

        public Employee UpdateEmployee(Employee emp)
        {
            var result = employeeRepository.Update(emp);

            return result > 0 ? emp : new Employee();
        }
    }
}
