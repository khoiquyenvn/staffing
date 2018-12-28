using Nancy;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.IO;
using System.Linq;
using System.Threading;
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

        protected Response CreateResponse(object result, HttpStatusCode status = HttpStatusCode.OK)
        {
            var currentContext = Thread.CurrentPrincipal;
            var response = new Response();
            response.StatusCode = status;
            response.ContentType = "application/json";

            response.Contents = stream =>
            {
                Thread.CurrentPrincipal = currentContext;

                using (var streamWriter = new StreamWriter(stream))
                using (var jsonWriter = new JsonTextWriter(streamWriter))
                {
                    JsonSerializer ser = new JsonSerializer
                    {
                        ReferenceLoopHandling = ReferenceLoopHandling.Ignore
                    };

                    ser.Serialize(jsonWriter, result);
                    jsonWriter.Flush();
                }
            };
            return response;
        }
    }
}