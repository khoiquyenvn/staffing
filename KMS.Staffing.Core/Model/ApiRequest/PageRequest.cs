using KMS.Staffing.Core.Model.ApiRequest;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace KMS.Staffing.Core.Model.ApiRequest
{
    public class PageRequest
    {
        public List<SearchCriteria> Criteria { get; set; }

        public void RemoveEmptyCriteria()
        {
            if (Criteria == null)
            {
                return;
            }

            var filterdCriteria = Criteria.Where(x => !string.IsNullOrEmpty(x.Value)).ToList();
            Criteria = filterdCriteria;
        }
    }
}
