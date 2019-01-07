using KMS.Staffing.Core.Contracts;
using KMS.Staffing.Core.Model;
using KMS.Staffing.Repository.Contants;
using KMS.Staffing.Repository.DBContexts;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace KMS.Staffing.Repository.Repos
{
    public class ProjectRepository : BaseRepository, IProjectRepository
    {
        private readonly string teamAvatarPath = ConfigurationManager.AppSettings["teamAvatarPath"];

        public const string DefaultProjectImage = "DefaultProjectImage.jpg";

        public ProjectRepository()
        {
        }

        public int Add(Project project)
        {            
            Context.Projects.Add(project);            
            return Context.SaveChanges();
        }

        public int Delete(Guid id)
        {
            var deleteProject = FindById(id);
            Context.Projects.Remove(deleteProject);
            return Context.SaveChanges();
        }

        public Project FindById(Guid id)
        {
            var result = Context.Projects.Where(x => x.Id == id).SingleOrDefault();
            this.UpdateAdditionalDetail(result);
            return result;
        }

        public IEnumerable<Project> GetProjects()
        {
            return Context.Projects;
        }

        public int Update(Project project)
        {
            Context.Entry(project).State = System.Data.Entity.EntityState.Modified;
            return Context.SaveChanges();
        }

        private void UpdateAdditionalDetail(Project project)
        {
            var originalPhoto = project.Photo;
            if (String.IsNullOrWhiteSpace(originalPhoto))
            {
                originalPhoto = DefaultProjectImage;
            }
            project.PhotoURL = $"{teamAvatarPath}{originalPhoto}";
        }
    }
}
