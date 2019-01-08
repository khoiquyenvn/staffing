using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace KMS.Staffing.Core.Model
{
    public static class ListExtension
    {
        static Random rnd = new Random();
        public static T GetRandom<T>(this List<T> lst)
        {
            if (lst?.Any() == true)
            {
                return lst[rnd.Next(lst.Count)];
            }
            else
            {
                return default(T);
            }
        }
    }
}
