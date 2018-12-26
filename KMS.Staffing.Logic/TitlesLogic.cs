using KMS.Staffing.Core.Contracts;
using KMS.Staffing.Core.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace KMS.Staffing.Logic
{
    public class TitlesLogic : ITitlesLogic
    {
        readonly ITitleRepository titleRepository;

        public TitlesLogic(ITitleRepository titleRepository)
        {
            this.titleRepository = titleRepository;
        }

        public List<Title> GetTitles()
        {
            return titleRepository.GetTitles().ToList();
        }
    }
}
