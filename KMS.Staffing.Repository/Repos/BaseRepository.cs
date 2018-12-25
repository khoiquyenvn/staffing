using KMS.Staffing.Repository.Contants;
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
        protected readonly string AppConfigConnectionString = "server=(local);database=KmsStaffPlan;user id=sa;password=1234Qwer";// ConfigurationManager.ConnectionStrings[StaffingKey.ConnectionString].ConnectionString;

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
