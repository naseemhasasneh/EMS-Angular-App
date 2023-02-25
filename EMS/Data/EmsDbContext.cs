using EMS.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EMS.Data
{
    public class EmsDbContext : DbContext
    {
        public EmsDbContext(DbContextOptions<EmsDbContext> option) :base(option)
        {

        }
        public DbSet<Employee> Employees { get; set; }
    }
}
