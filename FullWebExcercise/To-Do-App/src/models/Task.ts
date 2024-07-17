export class Task
{
    name:string;
    description:string;
    isCompleted:boolean;
    id:number;
    taskDate:Date;

    constructor(args:any)
    {
        this.name=args.Name;
        this.description=args.Description;
        this.isCompleted=args.isCompleted;
        this.id=args.id;
        this.taskDate=args.taskDate;
    }
}