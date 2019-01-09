using KMS.Staffing.Core.Contracts;
using KMS.Staffing.Core.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace KMS.Staffing.Repository.Repos
{
    public class SessionPlanRepository : BaseRepository, ISessionPlanRepository
    {
        public IEnumerable<SessionPlan> FindAllSessionPlan(Guid projectId)
        {
            return Context.SessionPlans.Where(x => x.ProjectId == projectId).ToList();
        }

        public SessionPlan FindById(Guid sessionPlanId)
        {
            return Context
                .SessionPlans                
                .Include("Requests.RequestDetails")
                .SingleOrDefault(x => x.Id.Equals(sessionPlanId));
        }
    }
}
