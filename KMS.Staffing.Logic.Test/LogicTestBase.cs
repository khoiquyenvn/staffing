using Nancy.TinyIoc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace KMS.Staffing.Logic.Test
{
    public class LogicTestBase
    {
        protected readonly TinyIoCContainer fixture;

        public LogicTestBase()
        {
            fixture = new TinyIoCContainer();
        }
    }
}
