using KMS.Staffing.Core.Model;
using KMS.Staffing.Core.Model.ApiRequest;
using KMS.Staffing.Logic;
using Nancy;
using Nancy.ModelBinding;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading;
using System.Web;

namespace KMS.Staffing.WebAPI
{ 
    /// <summary>
    /// Summary description for EmployeesModule
    /// </summary>
    public class EmployeeModule : BaseModule
    {
        public EmployeeModule(IEmployeeLogic employeeLogic) : base("employees")
        {
            Post["/getEmployees"] = parameters =>
            {
                var pagedRequest = this.Bind<EmployeePageRequest>();
                var result = employeeLogic.LoadEmployees(pagedRequest);
                return CreateResponse(result);
            };

            Get["/{id?}"] = parameters =>
            {
                string id = parameters.id;
                int? empId = Convert.ToInt32(id);
                var result = employeeLogic.GetEmployee(empId);
                return CreateResponse(result);
            };

            Post["/"] = parameters =>
            {
                var employee = this.Bind<Employee>();
                var result = employeeLogic.UpdateEmployee(employee);
                return CreateResponse(result);
            };
        }
    }
}