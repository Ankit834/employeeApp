using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EmployeeApi.Model.ViewModel
{
    public class EmployeeGridViewModel
    {
        public int EmployeeId { get; set; }
        public string Name { get; set; }
        public string Designation { get; set; }
        public string ManagerName { get; set; }
        public string EmployeeType { get; set; }

    }
}
