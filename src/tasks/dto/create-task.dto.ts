import { IsNotEmpty } from "class-validator";   //the class validatoe that we add it
export class CreateTaskDto {
  @IsNotEmpty()   // decorater that handle the validation of title should be fill in 
  title: string;
  @IsNotEmpty()
  description: string;
}
// dto allows us to easily implement validation
// in other project we can create task with empty title and description we want to take care of this with pipes 