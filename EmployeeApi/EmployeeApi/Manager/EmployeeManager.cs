using EmployeeApi.Model.DataModel;
using EmployeeApi.Model.ViewModel;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EmployeeApi.Manager
{
    public class EmployeeManager
    {
        private readonly EmployeeContext _employeeContext;

        public EmployeeManager(EmployeeContext employeeContext)
        {
            _employeeContext = employeeContext;
        }

        public async Task<Department[]> GetDepartments()
        {
            return _employeeContext.Departments.ToArray();
        }

        public async Task<EmployeeType[]> GetEmployeeTypes()
        {
            return _employeeContext.EmployeeTypes.ToArray();
        }

        public async Task<EmployeeGridViewModel[]> GetAllEmployees()
        {
            List<EmployeeGridViewModel> employees = new List<EmployeeGridViewModel>();
            EmployeeGridViewModel emp;
            await _employeeContext.Employees.Include(e => e.Department).Include(e => e.EmployeeType).ForEachAsync(employee => {
                emp = new EmployeeGridViewModel();
                emp.EmployeeId = employee.EmployeeId;
                emp.Name = employee.FirstName + " " + employee.LastName;
                emp.Designation = employee.Designation;
                emp.ManagerName = employee.ManagerName;
                emp.EmployeeType = employee.EmployeeType.EmployeeTypeName;
                employees.Add(emp);
            });

            return employees.ToArray();
        }

        public async Task<EmployeeDetailsViewModel> GetEmployeeById(int id)
        {
            var employee = await _employeeContext.Employees.Include(e => e.Department).Include(e => e.EmployeeType).FirstOrDefaultAsync(emp => emp.EmployeeId == id);
            EmployeeDetailsViewModel empDetails = new EmployeeDetailsViewModel()
            {
                EmployeeId = employee.EmployeeId,
                FirstName = employee.FirstName,
                LastName = employee.LastName,
                Designation = employee.Designation,
                ManagerName = employee.ManagerName,
                EmployeeType = employee.EmployeeTypeId,
                Department = employee.DepartmentId,
                Notes = employee.Notes
            };

            return empDetails;
        }

        public async Task AddEmployee(SaveEmployeeModel employee)
        {
            var employeeDetails = new Employee
            {
                FirstName = employee.FirstName,
                LastName = employee.LastName,
                Designation = employee.Designation,
                ManagerName = employee.ManagerName,
                EmployeeTypeId = employee.EmployeeType,
                DepartmentId = employee.Department,
                Notes = employee.Notes
            };

            await _employeeContext.Employees.AddAsync(employeeDetails);
            await _employeeContext.SaveChangesAsync();

        }

        public async Task UpdateEmployee(SaveEmployeeModel employee)
        {
            var employeeDetails = new Employee
            {
                EmployeeId = employee.EmployeeId,
                FirstName = employee.FirstName,
                LastName = employee.LastName,
                Designation = employee.Designation,
                ManagerName = employee.ManagerName,
                EmployeeTypeId = employee.EmployeeType,
                DepartmentId = employee.Department,
                Notes = employee.Notes
            };
            _employeeContext.Employees.Update(employeeDetails);
            await _employeeContext.SaveChangesAsync();
        }

        public async Task DeleteEmployee(int id)
        {
            var employee = await _employeeContext.Employees.FindAsync(id);
            _employeeContext.Employees.Remove(employee);
            await _employeeContext.SaveChangesAsync();
        }

    }
}
