using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

namespace BenchmarkingOfflinePoc.Models.Database
{
    public partial class OfflinePocDbEntities : DbContext
    {
        public OfflinePocDbEntities()
        {
        }

        public OfflinePocDbEntities(DbContextOptions<OfflinePocDbEntities> options)
            : base(options)
        {
        }

        public virtual DbSet<Case> Case { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. See http://go.microsoft.com/fwlink/?LinkId=723263 for guidance on storing connection strings.
                optionsBuilder.UseSqlServer("Server=.\\SQLEXPRESS;Database=offlinepocdb;Trusted_Connection=True;");
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {}
    }
}
