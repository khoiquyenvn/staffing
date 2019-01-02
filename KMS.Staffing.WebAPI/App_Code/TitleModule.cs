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
    /// Summary description for TitlesModule
    /// </summary>
    public class TitleModule : BaseModule
    {
        public TitleModule(ITitleLogic titleLogic) : base("titles")
        {
            Get["/"] = parameters =>
            {
                var result = titleLogic.GetTitles();
                return CreateResponse(result);
            };
        }
    }
}