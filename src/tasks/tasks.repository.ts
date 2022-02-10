import { EntityRepository,Repository } from 'typeorm' ;                             // repository give us the hand to deal witn entities 
import { Task } from './task.entity' ; 
import { CreateTaskDto } from './dto/create-task.dto';
import { TaskStatus } from './task.status.enum';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';

@EntityRepository(Task)                                                            // to tell typeorm that's going to be repository of task
export class TasksRepository extends Repository<Task>{      
    async getTask  (filterDto : GetTasksFilterDto): Promise<Task[]>{
        const{status, search}=filterDto ;
        const query = this.createQueryBuilder('task') ;                                // querry allows us to build SQL queries execute and get transformred entities like SELECT from table 
        if(status){
            query.andWhere('task.status =: status', {status});

        }

        if(search){
            query.andWhere(
                'LOWER(task.title) LIKE LOWER(:search) OR LOWER(task.description) LIKE LOWER(:search)',
                {search: `%${search}$`},
            );


        }



        const tasks = await query.getMany();
        return tasks;
    }   





    async createTask(createTaskDto: CreateTaskDto): Promise<Task> {
        const {title,description} = createTaskDto;
        const task = this.create({
          title,
          description,
          status: TaskStatus.OPEN ,
        });
        await this.save(task) ;
        return task ;

}
}