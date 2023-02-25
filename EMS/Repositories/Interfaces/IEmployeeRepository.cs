using EMS.Dtos;
using EMS.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EMS.Repositories.Interfaces
{
    public interface IEmployeeRepository
    {
        Task<List<Employee>> GetEmployees();
        Task<Employee> CreateEmployee(CreateEmployeeDto employee);
        Task<Employee> GetById(int id);
        Task UpdateEmployee(UpdateEmployeeDto employeeDto);
        Task DeleteEmployee(int id);
    }
}
