using KMS.Staffing.Core.Contracts;
using KMS.Staffing.Core.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace KMS.Staffing.Repository.Repos
{
    public class RequestRepository : BaseRepository, IRequestRepository
    {
        public IEnumerable<Request> getRequestList(Guid sessionPlanId)
        {
            var requestList = Context.Requests.Where(request => request.SessionPlanId == sessionPlanId).Include(x => x.RequestDetails).Include("RequestDetails.Title").Include("RequestDetails.Skill");
            return requestList;
        }

        public Request FindById(Guid requestId)
        {
            return Context
                .Requests
                .Include(nameof(Request.RequestDetails))
                .FirstOrDefault(x => x.Id.Equals(requestId));
        }
    }    
}
