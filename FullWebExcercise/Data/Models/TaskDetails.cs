using Microsoft.EntityFrameworkCore.Metadata;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Diagnostics.CodeAnalysis;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Data.Models
{
    public class TaskDetails
    {
        [Key]
        [NotNull]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public required int Id { get; set; }

        public string Name { get; set; }=string.Empty;

        public string Description { get; set; }=string.Empty;

        public DateOnly TaskDate {  get; set; }

        public int? UserId { get; set; }

        public bool IsCompleted { get; set; }=false;

        public User User { get; set; }

        public TaskDetails() { }
    }
}
