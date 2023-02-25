using EMS.Dtos;
using EMS.Models;
using EMS.Repositories.Interfaces;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EMS.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EmployeesController : ControllerBase
    {
        private readonly IEmployeeRepository _employeeRepo;

        public EmployeesController(IEmployeeRepository employeeRepository)
        {
            _employeeRepo = employeeRepository;
        }
       
        [HttpGet]
        public async Task<ActionResult<List<Employee>>> Get()
        {
            var employees = await _employeeRepo.GetEmployees();
            try
            {
                if (employees == null)
                {
                    return NotFound();
                }
            }
            catch(Exception ex)
            {
                Console.WriteLine(ex);
            }

            return Ok(employees);
        }
        [HttpGet("{id}",Name ="GetEmployee")]
        public async Task<ActionResult<Employee>> Get(int id)
        {
            var employee = await _employeeRepo.GetById(id);

            if (employee == null)
            {
                return NotFound();
            }

            return Ok(employee);
        }


        [HttpPost]
        public async Task<ActionResult> Post([FromBody] CreateEmployeeDto employeeDto)
        {
            
            if (employeeDto == null)
            {
                return BadRequest();
            }
           var employeeCreated=await _employeeRepo.CreateEmployee(employeeDto);
           return CreatedAtRoute("GetEmployee", new { id = employeeCreated.Id },employeeCreated);
        }

        [HttpPut("{id}")]
        public async Task<ActionResult> Put(int id, [FromBody] UpdateEmployeeDto employeeDto)
        {
            if (id == 0)
            {
                return NotFound();
            }
            employeeDto.Id = id;
           await _employeeRepo.UpdateEmployee(employeeDto);
            return NoContent(); //returns 204 status code meaning that the update was successful.
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> Delete(int id)
        {
            if (id == 0)
            {
                return NotFound();
            }
            await _employeeRepo.DeleteEmployee(id);
            return NoContent();
        }
    }
}
