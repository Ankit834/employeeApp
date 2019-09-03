using EmployeeApi.Controllers;
using EmployeeApi.Manager;
using EmployeeApi.Model.DataModel;
using EmployeeApi.Model.ViewModel;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Threading.Tasks;
using Xunit;

namespace EmployeeApi.Test
{
    public class EmployeeTest : ControllerBase
    {
        EmployeeManager _empManager;
        EmployeeContext _empContext;
        EmployeeController _controller;

        [Fact]
        public async Task Task_Test_GetDepartments()
        {
            setContext();
            var data = await _controller.GetDepartments();

            Assert.IsType<ActionResult<Department[]>>(data);
        }

        public async Task Task_Test_GetEmployeeTypes()
        {
            setContext();
            var data = await _controller.GetEmployeeTypes();

            Assert.IsType<ActionResult<EmployeeType[]>>(data);
        }

        public async Task Task_Test_GetAllEmployees()
        {
            setContext();
            var data = await _controller.GetAllEmployees();

            Assert.IsType<ActionResult<EmployeeGridViewModel[]>>(data);
        }

        public async Task Task_Test_GetEmployeeById()
        {
            setContext();
            int empId = 2;
            var data = await _controller.GetEmployeeById(empId);

            Assert.IsType<ActionResult<EmployeeDetailsViewModel>>(data);
        }

        public async Task Task_Test_AddEmployee()
        {
            setContext();
            SaveEmployeeModel emp = new SaveEmployeeModel
            {
                FirstName = "Test_FirstName",
                LastName = "Test_LastName",
                Designation = "Test_Designation",
                Department = 2,
                ManagerName = "Test_Manager",
                EmployeeType = 1,
                Notes = "These are the Notes"
            };
            var data = await _controller.AddEmployee(emp);

            Assert.IsType<OkObjectResult>(data);
        }

        public async Task Task_Test_UpdateEmployee()
        {
            setContext();
            SaveEmployeeModel emp = new SaveEmployeeModel
            {
                EmployeeId = 8,
                FirstName = "Test_FirstName",
                LastName = "Test_LastName",
                Designation = "Test_Designation",
                Department = 2,
                ManagerName = "Test_Manager",
                EmployeeType = 1,
                Notes = "These are the Notes"
            };
            var data = await _controller.GetDepartments();

            Assert.IsType<OkObjectResult>(data);
        }

        public async Task Task_Test_DeletEmployee()
        {
            setContext();
            int empId = 8;
            var data = await _controller.GetDepartments();

            Assert.IsType<OkObjectResult> (data);
        }

        public void setContext()
        {
            var dbContext = new DbContextOptionsBuilder<EmployeeContext>().UseSqlServer("Server=.;Database=Employee;Trusted_Connection=True;MultipleActiveResultSets=true");
            _empContext = new EmployeeContext(dbContext.Options);
            _empManager = new EmployeeManager(_empContext);
            _controller = new EmployeeController(_empManager);
        }


    }
}
