import { Injectable, NotFoundException } from '@nestjs/common';
import { Task, TaskStatus } from './task.model';
import { v4 as uuid } from 'uuid';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';

@Injectable()    //manage objects without thinking about the instantiation of them, because that is already managed by the injector
export class TasksService {
  private tasks: Task[] = [];     // set of tasks 

  getAllTasks(): Task[] {
    return this.tasks;
  }

  /*  ************** if we search on tasks with filters ************************
  getTasksWithFilters(filterDto: GetTasksFilterDto): Task[] {
    const { status, search } = filterDto;
    let tasks = this.getAllTasks();
    // do something with status
    if (status) {
      tasks  = tasks.filter((task) => task.status === status);
    }

    if (search) {
      tasks = tasks.filter((task) => {
        if (task.title.includes(search) || task.description.includes(search)) {
          return true;
        }

        return false;
      });
    }

    return tasks;
  }*/

  getTaskById(id: string): Task {     // verify if ther is a task with similar id with pipes 
    /* with pipes it works like this
    1.try to get task 
    2.if not found , throw an eerror (404 not found)
    3.otherwise, return the found task */

    const found =  this.tasks.find((task) => task.id === id);
    if (!found){
      throw new NotFoundException (`task with ID"${id}not found`) ;
    }
    return found ;
  }

  createTask(createTaskDto: CreateTaskDto): Task {
    const { title, description } = createTaskDto;

    const task: Task = {
      id: uuid(),    //generate id random
      title,
      description,
      status: TaskStatus.OPEN,
    };

    this.tasks.push(task);
    return task;
  }
 
  deleteTask(id: string): void {
    const found = this.getTaskById(id)
    this.tasks = this.tasks.filter((task) => task.id !== found.id); // delete task by id with pipes **gettaskbyid contain the exception
  }

  updateTaskStatus(id: string, status: TaskStatus) {
    const task = this.getTaskById(id);  // when we call meth gettaskbyid we call pipes handling in that methode too
    task.status = status;
    return task;
  }
}
