using KMS.Staffing.Core.Model;
using System;
using System.Collections.Generic;

namespace KMS.Staffing.Logic
{
    public interface IProjectLogic
    {
        int CountProjects();
        List<Project> GetProjects();
        Project GetProjectDetail(Guid projectId);
        List<ProjectStaff> GetAllEmployeeInProject(Guid projectId);
    }
}