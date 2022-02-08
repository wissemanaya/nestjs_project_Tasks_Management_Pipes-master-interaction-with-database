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
import { Task, TaskStatus } from './task.model';
import { TasksService } from './tasks.service';

@Controller('tasks')    //  to create a basic controller, we use classes and decorators ** localhost:3000/tasks
export class TasksController {
  constructor(private tasksService: TasksService) {}      //object of service 
  //@Get()
  // ****************** filter on tasks ******************
  /*getTasks( @Query() filterDto: GetTasksFilterDto): Task[] {
    //if we have any filterrs  defined call tasksService.getTasksWithFilters
    //if (Object.keys(filterDto).length) {         // if one of status or search defined
      //return this.tasksService.getTasksWithFilters(filterDto);
    //} else {
      return this.tasksService.getAllTasks() ;
    }
  }*/
  getTasks(): Task[] {
    return this.tasksService.getAllTasks();
  }

  @Get('/:id')
  getTaskById(@Param('id') id: string): Task {
   return this.tasksService.getTaskById(id);    //@parm() handler that get the value passed in parmatere 
  }                                             // http://localhost:3000/tasks/1b29cae5-ae3e-4ccd-b952-96aaa2a75b59

  @Post()
  createTask(@Body() createTaskDto: CreateTaskDto): Task {    //@Body() handler that contain the param defined in body of postmen or insomnia 
    return this.tasksService.createTask(createTaskDto);
  }
  

  @Delete('/:id')
  deleteTask(@Param('id') id: string): void {
    return this.tasksService.deleteTask(id);
  }

  @Patch('/:id/status')                // pass the id and status 
  updateTaskStatus(
    @Param('id') id: string,               // status in body 
    @Body () UpdateTaskStatusDto: UpdateTaskStatusDto ,
  ): Task {
    const { status} = UpdateTaskStatusDto ;
    return this.tasksService.updateTaskStatus(id, status);
  }
}
