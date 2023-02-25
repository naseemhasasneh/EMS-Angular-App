using EMS.Data;
using EMS.Dtos;
using EMS.Models;
using EMS.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EMS.Repositories
{
    public class EmployeeRepository : IEmployeeRepository
    {
        private readonly EmsDbContext _context;

        public EmployeeRepository(EmsDbContext dbContext)
        {
            _context = dbContext;
        }

        public async Task<Employee> CreateEmployee(CreateEmployeeDto employeeDto)
        {
            var newEmployee = new Employee()
            {
                Name = employeeDto.Name,
                Age = employeeDto.Age,
                position = employeeDto.position,
                Salary = employeeDto.Salary
            };

            await _context.Employees.AddAsync(newEmployee);
            await _context.SaveChangesAsync();
            return newEmployee;
        }

        public async Task DeleteEmployee(int id)
        {
            var employeeToDelete = await _context.Employees.SingleOrDefaultAsync(e => e.Id == id);
            _context.Employees.Remove(employeeToDelete);
             await _context.SaveChangesAsync();
        }

        public async Task<Employee> GetById(int id)
        {
            var employee =  await _context.Employees.SingleOrDefaultAsync(e => e.Id == id);
            return employee;
        }

        public async Task<List<Employee>>  GetEmployees()
        {
            return await _context.Employees.ToListAsync();
        }

        public async Task UpdateEmployee(UpdateEmployeeDto employeeDto)
        {
            var employeeToUpdate = await _context.Employees.SingleOrDefaultAsync(e => e.Id == employeeDto.Id);
            employeeToUpdate.Name = employeeDto.Name;
            employeeToUpdate.Age = employeeDto.Age;
            employeeToUpdate.position = employeeDto.position;
            employeeToUpdate.Salary = employeeDto.Salary;
            await _context.SaveChangesAsync();
        }
    }
}
