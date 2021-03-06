﻿using KMS.Staffing.Core.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace KMS.Staffing.Core.Contracts
{
    public interface IRequestRepository
    {
        IEnumerable<Request> getRequestList(Guid sessionPlanId);
        Request FindById(Guid requestId);
    }
}
