using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EmployeeApi.Model.DataModel
{
    public class Employee
    {
        public int EmployeeId { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Designation { get; set; }
        public string ManagerName { get; set; }
        public int DepartmentId { get; set; }
        public int EmployeeTypeId { get; set; }
        public string Notes { get; set; }

        public Department Department { get; set; }
        public EmployeeType EmployeeType { get; set; }
    }
}
