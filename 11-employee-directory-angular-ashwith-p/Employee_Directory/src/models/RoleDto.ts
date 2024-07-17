export class RoleDTO
{
    Id :number;
    Name:string        

    Department:string;

    Description?:string;

    Location:string;        

    constructor(Id:number,Name:string,Department:string,Description:string|undefined,Location:string)
    {
        this.Id=Id;
        this.Name=Name;
        this.Department=Department;
        this.Description=Description;
        this.Location=Location;
    }
}

