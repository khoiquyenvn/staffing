﻿using KMS.Staffing.Core.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace KMS.Staffing.Core.Contracts
{
    public interface IProjectStaffRepository
    {
        IEnumerable<ProjectStaff> FindAllEmployee(Guid projectId);
    }
}
