using KMS.Staffing.Core.Model;
using KMS.Staffing.Core.Model.ApiResponse;
using KMS.Staffing.Logic.Bussiness.Result;
using System;
using System.Collections.Generic;

namespace KMS.Staffing.Logic
{
    public interface IProjectLogic
    {
        int CountProjects();
        List<Project> GetProjects();
        Project GetProjectDetail(Guid projectId);
        List<List<ProjectStaff>> GetAllEmployeeInProject(Guid projectId);
        List<SessionPlan> GetAllSessionPlanList(Guid projectId);
        SessionResult GetAllRequestList(Guid projectId);
        StaffingResult Arrange(Guid sessionPlanId);
    }
}