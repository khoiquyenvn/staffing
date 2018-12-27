using KMS.Staffing.Core.Model;
using KMS.Staffing.Core.Model.ApiRequest;
using System.Collections.Generic;

namespace KMS.Staffing.Logic
{
    public interface IEmployeesLogic
    {
        List<Employee> GetEmployees(EmployeePageRequest pageRequest);
    }
}