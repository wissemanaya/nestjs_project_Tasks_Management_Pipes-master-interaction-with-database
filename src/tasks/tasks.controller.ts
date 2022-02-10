import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { title } from 'process';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { UpdateTaskStatusDto } from './dto/update-task-status.dto';
import { TaskStatus } from './task.status.enum';
import { TasksService } from './tasks.service';
import { Task } from './task.entity';

@Controller('tasks')    //  to create a basic controller, we use classes and decorators ** localhost:3000/tasks
export class TasksController {
  constructor(private tasksService: TasksService) {}      //object of service 

@Get()  
getTasks( @Query() filterDto: GetTasksFilterDto): Promise<Task[]> {
      return this.tasksService.getTasks(filterDto)
    }
  
@Get('/:id')
getTaskById(@Param('id') id: string): Promise<Task> {
 return this.tasksService.getTaskById(id); 
}

@Post()
  createTask(@Body() createTaskDto: CreateTaskDto): Promise<Task> {    //@Body() handler that contain the param defined in body of postmen or insomnia 
    return this.tasksService.createTask(createTaskDto);
  }
  
  @Delete('/:id')
  deleteTask(@Param('id') id: string): Promise<void> {
    return this.tasksService.deleteTask(id);
  }

  @Patch('/:id/status')                // pass the id and status 
  updateTaskStatus(
    @Param('id') id: string,               // status in body 
    @Body () UpdateTaskStatusDto: UpdateTaskStatusDto ,
  ): Promise<Task> {
    const { status} = UpdateTaskStatusDto ;
    return this.tasksService.updateTaskStatus(id, status);
  }








  //@
  /*getTasks(): Task[] {
    return this.tasksService.getAllTasks();
  }
  // http://localhost:3000/tasks/1b29cae5-ae3e-4ccd-b952-96aaa2a75b59

  

  

  @Patch('/:id/status')                // pass the id and status 
  updateTaskStatus(
    @Param('id') id: string,               // status in body 
    @Body () UpdateTaskStatusDto: UpdateTaskStatusDto ,
  ): Task {
    const { status} = UpdateTaskStatusDto ;
    return this.tasksService.updateTaskStatus(id, status);
  }*/
}
