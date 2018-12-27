using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace KMS.Staffing.Core.Model.Utility
{
    public static class StringExtension
    {
        public static bool EqualsIgnoreCase(this string str, string strComparable)
        {
            return ("" + str).Equals(strComparable, StringComparison.OrdinalIgnoreCase);
        }

        public static bool ContainIgnoreCase(this string str, string containString)
        {
            str = ("" + str);
            containString = ("" + containString);

            return str.ToLower().Contains(containString.ToLower());
        }
    }
}
