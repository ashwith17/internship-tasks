export class Employee
{
    Id:string;
    FirstName:string;
    LastName:string;
    DateOfBirth?:string 
    Email:string;
    JoiningDate:string;
    DepartmentId:number;
    LocationId:number;
    RoleId:number;
    MobileNumber?:string;
    ManagerId?:string;
    ProjectId?:number;

    constructor(args:any)
    {
        this.Id=args.id;
        this.DateOfBirth=args.dateOfBirth;
        this.DepartmentId=args.departmentId;
        this.FirstName=args.firstName;
        this.LastName=args.lastName;
        this.Email=args.email;
        this.JoiningDate=args.joiningDate;
        this.LocationId=args.locationId;
        this.RoleId=args.roleId;
        this.ManagerId=args.managerId;
        this.ProjectId=args.projectId;
        this.MobileNumber=args.mobileNumber;
    }
}
