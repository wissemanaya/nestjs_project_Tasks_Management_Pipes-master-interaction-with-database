import { EntityRepository,Repository } from 'typeorm' ;                             // repository give us the hand to deal witn entities 
import { Task } from './task.entity' ; 


@EntityRepository(Task)                                                            // to tell typeorm that's going to be repository of task
export class TasksRepository extends Repository<Task>{           


}