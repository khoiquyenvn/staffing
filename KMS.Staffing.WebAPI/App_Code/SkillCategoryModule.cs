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
    /// Summary description for SkillCategoryModule
    /// </summary>
    public class SkillCategoryModule : BaseModule
    {
        public SkillCategoryModule(ISkillCategoryLogic skillCategoryLogic) : base("skillCategories")
        {
            Get["/"] = parameters =>
            {
                var result = skillCategoryLogic.GetSkillCategories();
                return CreateResponse(result);
            };
        }
    }
}