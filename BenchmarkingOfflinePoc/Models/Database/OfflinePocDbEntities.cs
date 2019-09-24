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
        public virtual DbSet<Function> Function { get; set; }
        public virtual DbSet<MetricType> MetricType { get; set; }
        public virtual DbSet<Question> Question { get; set; }
        public virtual DbSet<SchemaVersions> SchemaVersions { get; set; }
        public virtual DbSet<SurveyMetric> SurveyMetric { get; set; }
        public virtual DbSet<SurveyMetricMetadata> SurveyMetricMetadata { get; set; }
        public virtual DbSet<SurveyTemplate> SurveyTemplate { get; set; }
        public virtual DbSet<SystemMetric> SystemMetric { get; set; }
        public virtual DbSet<Tab> Tab { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. See http://go.microsoft.com/fwlink/?LinkId=723263 for guidance on storing connection strings.
                optionsBuilder.UseSqlServer("Server=.\\SQLEXPRESS;Database=offlinepocdb;Trusted_Connection=True;");
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Case>(entity =>
            {
                entity.HasOne(d => d.Function)
                    .WithMany(p => p.Case)
                    .HasForeignKey(d => d.FunctionId)
                    .HasConstraintName("FK_Case_Function");
            });

            modelBuilder.Entity<Question>(entity =>
            {
                entity.HasIndex(e => new { e.QuestionOrder, e.TabId })
                    .HasName("UK_QuestionOrder_Tab")
                    .IsUnique();

                entity.HasOne(d => d.SurveyMetricMetadata)
                    .WithMany(p => p.Question)
                    .HasForeignKey(d => d.SurveyMetricMetadataId)
                    .HasConstraintName("FK_Question_SurveyMetricMetadataId");

                entity.HasOne(d => d.Tab)
                    .WithMany(p => p.Question)
                    .HasForeignKey(d => d.TabId)
                    .HasConstraintName("FK_Question_Tab");
            });

            modelBuilder.Entity<SurveyMetric>(entity =>
            {
                entity.HasOne(d => d.Case)
                    .WithMany(p => p.SurveyMetric)
                    .HasForeignKey(d => d.CaseId)
                    .HasConstraintName("FK_SurveyMetric_Case");

                entity.HasOne(d => d.SurveyMetricMetadata)
                    .WithMany(p => p.SurveyMetric)
                    .HasForeignKey(d => d.SurveyMetricMetadataId)
                    .HasConstraintName("FK_SurveyMetric_SurveyMetricMetadata");
            });

            modelBuilder.Entity<SurveyMetricMetadata>(entity =>
            {
                entity.HasOne(d => d.MetricType)
                    .WithMany(p => p.SurveyMetricMetadata)
                    .HasForeignKey(d => d.MetricTypeId)
                    .HasConstraintName("FK_SurveyMetricMetadata_MetricType");

                entity.HasOne(d => d.SystemMetric)
                    .WithMany(p => p.SurveyMetricMetadata)
                    .HasForeignKey(d => d.SystemMetricId)
                    .HasConstraintName("FK_SurveyMetricMetadata_SystemMetric");
            });

            modelBuilder.Entity<SurveyTemplate>(entity =>
            {
                entity.HasOne(d => d.Function)
                    .WithMany(p => p.SurveyTemplate)
                    .HasForeignKey(d => d.FunctionId)
                    .HasConstraintName("FK_SurveyTemplate_Function");
            });

            modelBuilder.Entity<SystemMetric>(entity =>
            {
                entity.HasOne(d => d.MetricType)
                    .WithMany(p => p.SystemMetric)
                    .HasForeignKey(d => d.MetricTypeId)
                    .HasConstraintName("FK_SystemMetric_MetricType");
            });

            modelBuilder.Entity<Tab>(entity =>
            {
                entity.HasIndex(e => new { e.TabOrder, e.SurveyTemplateId })
                    .HasName("UK_TabOrder_SurveyTemplate")
                    .IsUnique();

                entity.HasOne(d => d.SurveyTemplate)
                    .WithMany(p => p.Tab)
                    .HasForeignKey(d => d.SurveyTemplateId)
                    .HasConstraintName("FK_Tab_SurveyTemplate");
            });
        }
    }
}
