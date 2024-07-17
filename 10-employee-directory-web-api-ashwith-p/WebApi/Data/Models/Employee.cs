﻿
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Data.Models;

public partial class Employee
{
    [Key,MaxLength(6)]
    public string Id { get; set; } = null!;

    [MaxLength(35)]
    public string FirstName { get; set; } = null!;

    [MaxLength(35)]
    public string LastName { get; set; } = null!;

    [MaxLength(320)]
    [EmailAddress]
    public string Email { get; set; } = null!;

    public long? MobileNumber { get; set; }

    public DateOnly? DateOfBirth { get; set; }

    public DateOnly JoiningDate { get; set; }

    public int RoleId { get; set; }

    public int DepartmentId { get; set; }

    public int LocationId { get; set; }

    [MaxLength(6)]
    public string? ManagerId { get; set; }

    public int? ProjectId { get; set; }

  
    public virtual Department Department { get; set; } = null!;

   
    public virtual ICollection<Employee> InverseManager { get; set; } = new List<Employee>();

   
    public virtual Location Location { get; set; } = null!;

   
    public virtual Employee? Manager { get; set; }

    [NotMapped]
    public virtual Project? Project { get; set; }


    public  Role Role { get; set; } 
}
