using KMS.Staffing.Core.Contracts;
using KMS.Staffing.Core.Model;
using KMS.Staffing.Repository.Contants;
using KMS.Staffing.Repository.DBContexts;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace KMS.Staffing.Repository.Repos
{
    public class ProjectRepository : BaseRepository, IProjectRepository
    {
        readonly StaffingContext context;

        public ProjectRepository()
        {
            context = new StaffingContext(GetConnectionString(""));
        }

        public int Add(Project project)
        {            
            context.Projects.Add(project);            
            return context.SaveChanges();
        }

        public int Delete(Guid id)
        {
            var deleteProject = FindById(id);
            context.Projects.Remove(deleteProject);
            return context.SaveChanges();
        }

        public Project FindById(Guid id)
        {
            var result = context.Projects.Where(x => x.Id == id).SingleOrDefault();
            return result;
        }

        public IEnumerable<Project> GetProjects()
        {
            return context.Projects;
        }

        public int Update(Project project)
        {
            context.Entry(project).State = System.Data.Entity.EntityState.Modified;
            return context.SaveChanges();
        }
    }
}
