using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace EmployeeApi.Model.ViewModel
{
    public class SaveEmployeeModel
    {
        public int EmployeeId { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public int Department { get; set; }
        public string Designation { get; set; }
        public string ManagerName { get; set; }
        public int EmployeeType { get; set; }
        public string Notes { get; set; }
        public string Image { get; set; }

    }
}
