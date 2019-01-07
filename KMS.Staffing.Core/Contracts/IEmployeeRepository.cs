using KMS.Staffing.Core.Model;
using KMS.Staffing.Core.Model.ApiRequest;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace KMS.Staffing.Core.Contracts
{
    public interface IEmployeeRepository
    {
        List<Employee> LoadEmployees(EmployeePageRequest pageRequest);
        Employee GetEmployee(int? empId);
        int Update(Employee emp);
        void UpdateAdditionalDetail(List<Employee> employees);
    }
}
