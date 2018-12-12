using Nancy;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Web;

namespace KMS.Staffing.WebAPI
{
    /// <summary>
    /// Summary description for BaseModule
    /// </summary>
    public abstract class BaseModule : NancyModule
    {
        protected static readonly string APIPrefix = ConfigurationManager.AppSettings["apiprefix"];

        protected BaseModule(string modulePath = "") : base($"/{APIPrefix}/{modulePath}")
        {
            //
            // TODO: Add constructor logic here
            //
        }
    }
}