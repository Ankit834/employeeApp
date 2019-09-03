using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using EmployeeApi.Manager;
using EmployeeApi.Model.DataModel;
using EmployeeApi.Model.ViewModel;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace EmployeeApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EmployeeController : ControllerBase
    {
        private readonly EmployeeManager _empManager;

        public EmployeeController(EmployeeManager empManager)
        {
            _empManager = empManager;
        }

        [HttpGet]
        [Route("Departments")]
        public async Task<ActionResult<Department[]>> GetDepartments()
        {
            return await _empManager.GetDepartments();
        }

        [HttpGet]
        [Route("EmployeeTypes")]
        public async Task<ActionResult<EmployeeType[]>> GetEmployeeTypes()
        {
            return await _empManager.GetEmployeeTypes();
        }

        [HttpGet]
        [Route("Employees")]
        public async Task<ActionResult<EmployeeGridViewModel[]>> GetAllEmployees()
        {
            return await _empManager.GetAllEmployees();
        }

        [HttpGet("{empId}")]
       public async Task<ActionResult<EmployeeDetailsViewModel>> GetEmployeeById(int empId)
        {
            return await _empManager.GetEmployeeById(empId);
        }

        [HttpPost]
        public async Task<ActionResult> AddEmployee([FromBody]SaveEmployeeModel employee)
        {
            await _empManager.AddEmployee(employee);
            return Ok();
        }

        [HttpPut]
        public async Task<ActionResult> UpdateEmployee([FromBody]SaveEmployeeModel employee)
        {
            await _empManager.UpdateEmployee(employee);
            return Ok();
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> DeletEmployee(int id)
        {
            await _empManager.DeleteEmployee(id);
            return Ok();
        }
    }
}