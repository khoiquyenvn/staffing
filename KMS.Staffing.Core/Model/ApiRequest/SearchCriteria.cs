using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace KMS.Staffing.Core.Model.ApiRequest
{
    public class SearchCriteria
    {
        public string Key { get; set; }
        public string Value { get; set; }
    }
}
