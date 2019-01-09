using KMS.Staffing.Core.Model;
using KMS.Staffing.Logic;
using Nancy;
using Nancy.ModelBinding;
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

            Get["/count"] = _ =>
            {
                return $"There are {projectLogic.CountProjects()} projects";
            };

            Get["/sessionPlan/{sessionPlanId}"] = _ =>
            {
                return CreateResponse(projectLogic.FindSessionPlan(_.sessionPlanId));
            };

            Get["/request/{requestId}"] = _ =>
            {
                return CreateResponse(projectLogic.FindRequest(_.requestId));
            };

            Get["/arrange"] = _ =>
            {
                return CreateResponse(projectLogic.Arrange(Guid.Parse(Request.Query.PlanId)).Result != null ? "Yes" : "No");
            };

            Post["/arrange"] = _ =>
            {
                var sessionPlan = this.Bind<SessionPlan>();

                return CreateResponse(projectLogic.Arrange(sessionPlan));
            };

            Post["/findEmployeesForRequest"] = _ =>
            {
                var request = this.Bind<Core.Model.Request>();

                return CreateResponse(projectLogic.FindEmployeesForRequest(request));
            };
        }
    }
}