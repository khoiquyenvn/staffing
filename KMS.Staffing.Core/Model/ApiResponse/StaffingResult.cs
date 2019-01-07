using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace KMS.Staffing.Core.Model.ApiResponse
{
    public class StaffingResult
    {
        public List<Employee> Result { get; set; }
        public int ExpectedResult { get; set; }
        public double? Fitness { get; set; }
    }
}
