using System;
using Microsoft.EntityFrameworkCore;
using Data.Models;

namespace Data
{
    public partial class ToDoAppDbContext : DbContext
    {
        public ToDoAppDbContext(DbContextOptions<ToDoAppDbContext> options)
            : base(options)
        {
        }

        public virtual DbSet<User> Users { get; set; }
        public virtual DbSet<TaskDetails> TaskDetails { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            // Configure Task entity to have a one-to-many relationship with User
            modelBuilder.Entity<Data.Models.TaskDetails>()
                 .HasOne(t => t.User)
                 .WithMany(u=>u.TaskDetails)
                 .HasForeignKey(t => t.UserId)
                 .OnDelete(DeleteBehavior.Restrict);// Consider using DeleteBehavior.Cascade, SetNull, or Restrict based on your requirements

            // Call the partial method to allow further configuration in another file
            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
