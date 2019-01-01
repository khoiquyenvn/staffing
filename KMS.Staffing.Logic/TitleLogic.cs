using KMS.Staffing.Core.Contracts;
using KMS.Staffing.Core.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace KMS.Staffing.Logic
{
    public class TitleLogic : ITitleLogic
    {
        readonly ITitleRepository titleRepository;

        public TitleLogic(ITitleRepository titleRepository)
        {
            this.titleRepository = titleRepository;
        }

        public List<Title> GetTitles()
        {
            return titleRepository.GetTitles().ToList();
        }
    }
}
