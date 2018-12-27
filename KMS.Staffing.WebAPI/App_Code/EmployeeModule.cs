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
    /// Summary description for ProjectsModule
    /// </summary>
    public class EmployeeModule : BaseModule
    {
        public EmployeeModule(IEmployeesLogic employeeLogic) : base("employees")
        {
            Post["/"] = parameters =>
            {
                var pagedRequest = this.Bind<EmployeePageRequest>();
                var result = employeeLogic.GetEmployees(pagedRequest);
                return CreateResponse(result);
            };
        }
    }
}