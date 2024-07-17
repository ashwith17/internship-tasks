namespace Data.Models
{
    public class EmployeeInfo
    {
        public string Id { get; set; } = string.Empty;

        public string FirstName { get; set; } = string.Empty;

        public string LastName { get; set; } = string.Empty;

        public string Email { get; set; } = string.Empty;

        public long? MobileNumber { get; set; }

        public DateOnly JoiningDate { get; set; } 

        public string Department { get; set; }

        public string Role { get; set; }

        public string Location { get; set; }

        public string? Manager { get; set; }

        public string? Project { get; set; }
    }
}
