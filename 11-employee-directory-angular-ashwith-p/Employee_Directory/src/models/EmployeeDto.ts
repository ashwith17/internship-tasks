
export class EmployeeDto
{
    Id:string;
    FirstName:string;
    LastName:string;
    Email:string;
    JoiningDate:string;
    Department:string;
    Location:string;
    Role:string;

    constructor(args:any)
    {
        this.Id=args.id;
        this.Department= args.department;
        this.FirstName= args.firstName;
        this.LastName= args.lastName;
        this.Email= args.email;
        this.JoiningDate= args.joiningDate;
        this.Location= args.location;
        this.Role= args.role;
    }
}
