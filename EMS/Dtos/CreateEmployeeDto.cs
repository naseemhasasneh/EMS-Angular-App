using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EMS.Dtos
{
    public class CreateEmployeeDto
    {
        public string Name { get; set; }
        public string Age { get; set; }
        public string position { get; set; }
        public int Salary { get; set; }
    }
}
