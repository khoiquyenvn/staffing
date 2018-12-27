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
        private StaffingContext(string connectionString = "") : base(connectionString)
        {

        }

        private static StaffingContext _context;
        public static StaffingContext Instance
        {
            get
            {
                return _context;
            }
        }

        public static void Init(string connectionString = "")
        {
            if (_context == null)
            {
                _context = new StaffingContext(connectionString);
            }
        }
        
        public DbSet<Project> Projects { get; set; }
        public DbSet<Department> Departments { get; set; }
        public DbSet<Title> Titles { get; set; }
        public DbSet<Employee> Employees { get; set; }
        public DbSet<Skill> Skills { get; set; }
        public DbSet<SkillCategory> SkillCategory { get; set; }
        public DbSet<EmployeeSkill> EmployeeSkills { get; set; }
        
    }    
}
