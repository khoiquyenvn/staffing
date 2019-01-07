using KMS.Staffing.Core.Model;
using KMS.Staffing.Core.Model.ApiResponse;
using System;
using System.Collections.Generic;

namespace KMS.Staffing.Logic
{
    public interface IProjectLogic
    {
        string test(string name);

        int CountProjects();

        List<Project> GetProjects();

        StaffingResult Arrange(Guid sessionPlanId);
    }
}