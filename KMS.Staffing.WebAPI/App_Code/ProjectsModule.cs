using KMS.Staffing.Logic;
using Nancy;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace KMS.Staffing.WebAPI
{ 
    /// <summary>
    /// Summary description for ProjectsModule
    /// </summary>
    public class ProjectsModule : BaseModule
    {
        public ProjectsModule(IProjectsLogic projectLogic) : base("projects")
        {
            Get["/"] = parameters =>
            {
                var result = projectLogic.GetProjects();
                return CreateResponse(result);
            };

            Get["/test"] = _ =>
            {
                return projectLogic.test(Request.Query.Name);
            };

            Get["/count"] = _ =>
            {
                return $"There are {projectLogic.CountProjects()} projects";
            };
        }
    }
}