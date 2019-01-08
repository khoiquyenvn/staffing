using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace KMS.Staffing.Core.Model
{
    public class MatchedResult
    {           
        public int MatchedScore { get; set; }        
        public int RequestExpectedScore { get; set; }
        public Guid MatchedRequest { get; set; }
    }
}
