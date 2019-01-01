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
    /// Summary description for ExperiencesModule
    /// </summary>
    public class ExperienceModule : BaseModule
    {
        public ExperienceModule(IExperienceLogic experienceLogic) : base("experiences")
        {
            Get["/"] = parameters =>
            {
                var result = experienceLogic.GetExperiences();
                return CreateResponse(result);
            };
        }
    }
}