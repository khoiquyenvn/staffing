using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace KMS.Staffing.Logic.Bussiness.Result
{
    public class RequestResult
    {
        public Guid Id { get; set; }
        public int Number { get; set; }
        public Guid? TitleId { get; set; }
        public string Skills { get; set; }
    }
}
