using KMS.Staffing.Core.Model;
using KMS.Staffing.Repository.Contants;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace KMS.Staffing.Repository.DBContexts
{
    public class StaffingContext : DbContext
    {
        public StaffingContext(string connectionString = "") : base(connectionString)
        {
            
        }
        
        public DbSet<Project> Projects { get; set; }
        public DbSet<Department> Departments { get; set; }
    }    
}
