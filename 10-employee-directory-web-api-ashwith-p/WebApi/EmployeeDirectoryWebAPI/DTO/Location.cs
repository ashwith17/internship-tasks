
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace EmployeeDirectoryWebAPI.DTO;

public class LocationDTO
{
    public int Id { get; set; }

    public string Name { get; set; } = null!;


}
