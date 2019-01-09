using KMS.Staffing.Core.Model;
using KMS.Staffing.Repository.Contants;
using KMS.Staffing.Repository.DBContexts;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Linq.Expressions;
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

        public IEnumerable<T> Query<T>(Expression<Func<T, bool>> predicate) where T:class
        {
            return Query<T>(predicate, new List<string>());
        }

        public IQueryable<T> Query<T>(Expression<Func<T, bool>> predicate, List<string> inclusions) where T : class
        {
            DbQuery<T> entities = Context.Set<T>();
            
            if (inclusions.Any())
            {
                inclusions.ForEach(x => entities = entities.Include(x));
            }

            return entities.Where(predicate);
        }
    }
}
