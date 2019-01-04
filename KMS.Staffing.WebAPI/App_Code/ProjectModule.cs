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
        public ProjectsModule(IProjectLogic projectLogic) : base("projects")
        {
            Get["/"] = parameters =>
            {
                var result = projectLogic.GetProjects();
                return CreateResponse(result);
            };

            Get["/{projectId}"] = parameters =>
            {
                var projectId = Guid.Parse(parameters.projectId);
                var result = projectLogic.GetProjectDetail(projectId);
                return CreateResponse(result);
            };

            Get["getMemberList/{projectId}"] = parameters =>
            {
                var projectId = Guid.Parse(parameters.projectId);
                var result = projectLogic.GetAllEmployeeInProject(projectId);
                return CreateResponse(result);
            };

            Get["/count"] = _ =>
            {
                return $"There are {projectLogic.CountProjects()} projects";
            };
        }
    }
}