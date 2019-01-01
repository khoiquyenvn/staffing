using KMS.Staffing.Core.Model;
using KMS.Staffing.Core.Model.ApiRequest;
using System;
using System.Collections.Generic;

namespace KMS.Staffing.Logic
{
    public interface IEmployeeLogic
    {
        List<Employee> LoadEmployees(EmployeePageRequest pageRequest);
        Employee GetEmployee(int? employeeId);
        Employee UpdateEmployee(Employee emp);
    }
}