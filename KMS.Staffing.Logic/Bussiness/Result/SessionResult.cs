using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace KMS.Staffing.Logic.Bussiness.Result
{
    public class SessionResult
    {
        public Guid Id { get; set; }
        public List<RequestResult> Requests { get; set; }
    }
}
