export class Role
{
    Id:number

    Name:string        

    Department:number;

    Description?:string;

    location:number[];        

    constructor(args:any)
    {
        this.Id=args.id
        this.Name=args.name;
        this.Department=args.department;
        this.Description=args?.description;
        this.location=args.location;
    }
}

