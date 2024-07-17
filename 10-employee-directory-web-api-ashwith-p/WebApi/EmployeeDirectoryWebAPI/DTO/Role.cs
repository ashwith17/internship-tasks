namespace EmployeeDirectoryWebAPI.DTO
{
    public class RoleDTO
    {
        public int Id { get; set; }

        public string Name { get; set; } = string.Empty;        

        public int Department { get; set; }

        public string? Description { get; set; }

        public List<int> Location { get; set; } = [];        
    }
}
