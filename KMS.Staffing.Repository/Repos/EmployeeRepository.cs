using KMS.Staffing.Core.Contracts;
using KMS.Staffing.Core.Model;
using KMS.Staffing.Core.Model.ApiRequest;
using KMS.Staffing.Core.Model.Constant;
using KMS.Staffing.Core.Model.Utility;
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
    public class EmployeeRepository : BaseRepository, IEmployeeRepository
    {
        private readonly string avatarPath = ConfigurationManager.AppSettings["avatarPath"];

        public EmployeeRepository()
        {

        }

        public List<Employee> LoadEmployees(EmployeePageRequest pageRequest)
        {
            var employees = Context.Employees.Include("Title").ToList();

            UpdateAdditionalDetail(employees);

            return FilterEmployeesByCriteria(employees, pageRequest);
        }

        public Employee GetEmployee(int? empId)
        {
            var employees = Context.Employees.Include("Title")
                                             .Include("EmployeeSkill.Skill")
                                             .Include("EmployeeSkill.Employee")
                                             .Include("EmployeeSkill.Skill.SkillCategory")
                                             .ToList();

            UpdateAdditionalDetail(employees);

            var result = employees.FirstOrDefault(e => e.Id.Equals(empId.Value));
            return result;
        }

        public int Update(Employee emp)
        {
            var updatedEmployee = Context.Employees.FirstOrDefault(e => e.Id.Equals(emp.Id));
            if (updatedEmployee == null)
            {
                return 0;
            }

            UpdateEmployeeInformation(updatedEmployee, emp);            
            return Context.SaveChanges();
        }

        #region Private methods

        private List<Employee> FilterEmployeesByCriteria(List<Employee> employees, EmployeePageRequest pageRequest)
        {
            if (pageRequest.Criteria == null || !pageRequest.Criteria.Any())
            {
                return employees;
            }

            pageRequest.RemoveEmptyCriteria();

            foreach (var criteria in pageRequest.Criteria)
            {
                var searchValue = criteria.Value;

                switch (criteria.Key)
                {
                    case EmployeeFilterKey.All:
                        employees = employees.Where(x => (x.DisplayId.ContainIgnoreCase(searchValue) || 
                                                          x.Name.ContainIgnoreCase(searchValue) || 
                                                          x.Title.Name.ContainIgnoreCase(searchValue) ||
                                                          x.Email.ContainIgnoreCase(searchValue) ||
                                                          x.Address.ContainIgnoreCase(searchValue))).ToList();
                        break;
                    case EmployeeFilterKey.Id:
                        employees = employees.Where(x => x.DisplayId.ContainIgnoreCase(searchValue)).ToList();
                        break;
                    case EmployeeFilterKey.Name:
                        employees = employees.Where(x => x.Name.ContainIgnoreCase(searchValue)).ToList();
                        break;
                    case EmployeeFilterKey.Title:
                        employees = employees.Where(x => x.Title.Name.ContainIgnoreCase(searchValue)).ToList();
                        break;
                    case EmployeeFilterKey.Email:
                        employees = employees.Where(x => x.Email.ContainIgnoreCase(searchValue)).ToList();
                        break;
                    default:
                        employees = employees.Where(x => x.Address.ContainIgnoreCase(searchValue)).ToList();
                        break;
                }
            }

            return employees;
        }

        private void UpdateAdditionalDetail(List<Employee> employees)
        {
            employees.ForEach(e =>
            {
                e.DisplayId = e.Id.ToString("D" + 4); // Display ID as 4 digits
                e.PhotoURL = $"{avatarPath}{e.Photo}";
            });
        }

        private void UpdateEmployeeInformation(Employee updatedEmployee, Employee emp)
        {
            var title = Context.Titles.FirstOrDefault(t => t.Id.Equals(emp.TitleId));
            updatedEmployee.Name = emp.Name;
            updatedEmployee.Email = emp.Email;
            updatedEmployee.Phone = emp.Phone;
            updatedEmployee.Address = emp.Address;
            updatedEmployee.Title = title;
        }

        #endregion
    }
}
