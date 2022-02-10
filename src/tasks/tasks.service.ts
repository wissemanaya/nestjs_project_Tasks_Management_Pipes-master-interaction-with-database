import { Injectable, NotFoundException } from '@nestjs/common';
import { TaskStatus } from './task.status.enum';
import { v4 as uuid } from 'uuid';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { TasksRepository } from './tasks.repository';
import { Task } from './task.entity';

@Injectable()                        //manage objects without thinking about the instantiation of them, because that is already managed by the injector
export class TasksService {
  //private tasks: Task[] = [];      //no need because we i'm going to store tasks in database
  constructor(
    @InjectRepository(TasksRepository)                 
    private tasksRepository: TasksRepository,          // object of repository
  ) {}
getTasks(filterDto:GetTasksFilterDto): Promise<Task[]>{
  return this.tasksRepository.getTask (filterDto) ;          
} 

  async getTaskById(id: string): Promise<Task> {
     const found = await this.tasksRepository.findOne(id);
     if (!found){
      throw new NotFoundException (`task with ID"${id}not found`) ;
     }
     return found;
   }

  createTask(createTaskDto: CreateTaskDto): Promise<Task> {
    return this.tasksRepository.createTask(createTaskDto) ;
   }


   async deleteTask(id: string): Promise<void> {
    const result = await this.tasksRepository.delete(id) ;
    if (result.affected === 0) {
      throw new NotFoundException(`Task with ID "${id}" not found`);
    }
    
  }

  async updateTaskStatus(id: string, status: TaskStatus):Promise<Task> {
    const task = await this.getTaskById(id);  // when we call meth gettaskbyid we call pipes handling in that methode too
    task.status = status;
    await this.tasksRepository.save(task);
    return task;
  }



}
