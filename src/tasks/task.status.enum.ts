/*export interface Task {
  id: string;
  title: string;                   i don't need interface anymore since my task defined as entity of database 
  description: string;             and rename the file from task.model to tasl.status.enum
  status: TaskStatus;
}*/

export enum TaskStatus {
  OPEN = 'OPEN',
  IN_PROGRESS = 'IN_PROGRESS',
  DONE = 'DONE',
}
