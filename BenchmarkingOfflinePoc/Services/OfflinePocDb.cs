using BenchmarkingOfflinePoc.Models.Database;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;

namespace BenchmarkingOfflinePoc.Services
{
    public class OfflinePocDb : OfflinePocDbEntities
    {
        public readonly IConfiguration config;

        public OfflinePocDb(IConfiguration config)
        {
            this.config = config;
        }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            // Use the connection string provided in the appsettings.[environment].json file
            optionsBuilder.UseSqlServer(config.GetConnectionString("OflinePocConnectionString"));
        }
    }
}
