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

            Get["getSessionPlanList/{projectId}"] = parameters =>
            {
                var projectId = Guid.Parse(parameters.projectId);
                var result = projectLogic.GetAllSessionPlanList(projectId);
                return CreateResponse(result);
            };

            Get["getRequestList/{sessionPlanId}"] = parameters =>
            {
                var sessionPlanId = Guid.Parse(parameters.sessionPlanId);
                var result = projectLogic.GetAllRequestList(sessionPlanId);
                return CreateResponse(result);
            };

            Get["/count"] = _ =>
            {
                return $"There are {projectLogic.CountProjects()} projects";
            };

            Get["/arrage"] = _ =>
            {
                return CreateResponse(projectLogic.Arrange(Guid.Parse(Request.Query.PlanId)).Result != null ? "Yes" : "No");
            };
        }
    }
}