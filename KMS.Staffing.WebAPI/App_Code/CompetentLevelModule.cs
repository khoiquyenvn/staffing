using KMS.Staffing.Logic;
using Nancy;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading;
using System.Web;

namespace KMS.Staffing.WebAPI
{
    /// <summary>
    /// Summary description for CompetentLevelModule
    /// </summary>
    public class CompetentLevelModule : BaseModule
    {
        public CompetentLevelModule(ICompetentLevelLogic competentLevelLogic) : base("competentLevels")
        {
            Get["/"] = parameters =>
            {
                var result = competentLevelLogic.GetCompetentLevels();
                return CreateResponse(result);
            };
        }
    }
}