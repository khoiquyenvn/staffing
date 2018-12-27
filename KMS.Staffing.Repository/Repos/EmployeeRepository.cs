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
        readonly StaffingContext context;
        private readonly string avatarPath = ConfigurationManager.AppSettings["avatarPath"];

        public EmployeeRepository()
        {
            context = new StaffingContext(GetConnectionString(""));
        }

        public List<Employee> GetEmployees(EmployeePageRequest pageRequest)
        {
            var employees = context.Employees.ToList();

            employees.ForEach(e =>
            {
                e.DisplayId = e.Id.ToString("D" + 4); // Display ID as 4 digits
                e.PhotoURL = $"{avatarPath}{e.Photo}";
                e.Title = context.Titles.FirstOrDefault(t => t.Id.Equals(e.TitleId));
            });


            return FilterEmployeesByCriteria(employees, pageRequest);
        }

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
    }
}
