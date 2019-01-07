using KMS.Staffing.Core.Model;
using KMS.Staffing.Core.Model.ApiResponse;
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

        StaffingResult Arrange(Guid sessionPlanId);
    }
}