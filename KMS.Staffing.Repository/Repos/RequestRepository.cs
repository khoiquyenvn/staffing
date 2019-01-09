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
        public Request FindById(Guid requestId)
        {
            return Context
                .Requests
                .Include(nameof(Request.RequestDetails))
                .FirstOrDefault(x => x.Id.Equals(requestId));
        }
    }    
}
