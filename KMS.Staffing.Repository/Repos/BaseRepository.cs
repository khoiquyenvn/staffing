﻿using KMS.Staffing.Repository.Contants;
using KMS.Staffing.Repository.DBContexts;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace KMS.Staffing.Repository.Repos
{
    public class BaseRepository
    {
        protected static readonly string AppConfigConnectionString = ConfigurationManager.ConnectionStrings[StaffingKey.ConnectionString].ConnectionString;

        protected StaffingContext staffingContext = new StaffingContext(AppConfigConnectionString);

        static BaseRepository()
        {
            //StaffingContext.Init(AppConfigConnectionString);
        }

        public StaffingContext Context
        {
            get
            {
                return staffingContext;
            }
        }

        protected string GetConnectionString(string connectionString)
        {
            if (!string.IsNullOrWhiteSpace(connectionString))
            {
                return connectionString;
            }

            return AppConfigConnectionString;
        }
    }
}
