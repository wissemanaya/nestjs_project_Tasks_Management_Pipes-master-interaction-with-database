// entity is a table in database 

import  {Column, Entity, PrimaryGeneratedColumn} from 'typeorm' ;
import { TaskStatus } from './task.model';
@Entity()
export class Task {
  @PrimaryGeneratedColumn('uuid')      //define a colum contain random id .. pass the uuid beacause typeeorm generate sequence id (1..2..3)
  id: string ; 
  @Column()
  title: string ;
  @Column()
  description: string ;
  @Column()
  status: TaskStatus;
}