using KMS.Staffing.Logic;
using Nancy;
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
            Get["/"] = parameters =>
            {
                var result = employeeLogic.GetEmployees();
                return CreateResponse(result);
            };
        }
    }
}