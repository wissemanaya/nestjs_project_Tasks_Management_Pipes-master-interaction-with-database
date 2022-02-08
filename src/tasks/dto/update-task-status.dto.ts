import { IsEnum } from "class-validator";
import { TaskStatus } from "../task.model";
export class UpdateTaskStatusDto{
   @IsEnum(TaskStatus) // pipes verify enumeration in task status enum 
   status : TaskStatus ;
}