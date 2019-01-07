using KMS.Staffing.Core.Contracts;
using KMS.Staffing.Core.Model;
using System.Data.Entity;
using System;
using System.Collections.Generic;
using System.Linq;

namespace KMS.Staffing.Repository.Repos
{
    public class ProjectStaffRepository : BaseRepository, IProjectStaffRepository
    {
        public IEnumerable<ProjectStaff> FindAllEmployee(Guid projectId)
        {
            var result = Context.ProjectStaff.Where(ps => ps.ProjectId.Equals(projectId))
                .Include(x => x.Employee).Include(x => x.Position);
            return result;
        }
    }
}
