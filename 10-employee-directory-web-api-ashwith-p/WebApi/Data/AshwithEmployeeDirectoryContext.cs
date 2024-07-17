
using Microsoft.EntityFrameworkCore;
using Data.Models;


namespace Data;

public partial class AshwithEmployeeDirectoryContext(DbContextOptions<AshwithEmployeeDirectoryContext> options) : DbContext(options)
{
    public virtual DbSet<Department> Departments { get; set; }

    public virtual DbSet<Employee> Employees { get; set; }

    public virtual DbSet<Location> Locations { get; set; }

    public virtual DbSet<Project> Projects { get; set; }

    public virtual DbSet<Role> Roles { get; set; }

    public virtual DbSet<RoleDetail> RoleDetails { get; set; }

    public virtual DbSet<User> Users { get; set; }
    public virtual DbSet<EmployeeInfo> GetEmployees { get; set; }



    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<EmployeeInfo>()
        .ToView(nameof(GetEmployees))
        .HasKey(e => e.Id);


        modelBuilder.Entity<Employee>()
            .HasOne(e => e.Manager)
            .WithMany()
            .HasForeignKey(e => e.ManagerId)
            .OnDelete(DeleteBehavior.Restrict);

        modelBuilder.Entity<Employee>()
            .HasOne(e => e.Role)
            .WithMany(e=>e.Employees)
            .HasForeignKey(e => e.RoleId)
            .OnDelete(DeleteBehavior.Restrict);

        modelBuilder.Entity<Employee>()
            .HasOne(e => e.Department)
            .WithMany(e=>e.Employees)
            .HasForeignKey(e => e.DepartmentId)
            .OnDelete(DeleteBehavior.Restrict);

        modelBuilder.Entity<Employee>()
            .HasOne(e => e.Location)
            .WithMany(e=>e.Employees)
            .HasForeignKey(e => e.LocationId)
            .OnDelete(DeleteBehavior.Restrict);

        modelBuilder.Entity<Employee>()
            .HasOne(e => e.Project)
            .WithMany()
            .HasForeignKey(e => e.ProjectId)
            .OnDelete(DeleteBehavior.SetNull);

        modelBuilder.Entity<RoleDetail>(entity =>
        {
            entity.HasKey(e => new { e.RoleId, e.LocationId });
        });
        OnModelCreatingPartial(modelBuilder);
    }
    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}

