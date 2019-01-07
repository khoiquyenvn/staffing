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
    /// Summary description for SkillModule
    /// </summary>
    public class SkillModule : BaseModule
    {
        public SkillModule(ISkillLogic skillLogic) : base("skills")
        {
            Get["/"] = parameters =>
            {
                var result = skillLogic.GetSkills();
                return CreateResponse(result);
            };
        }
    }
}