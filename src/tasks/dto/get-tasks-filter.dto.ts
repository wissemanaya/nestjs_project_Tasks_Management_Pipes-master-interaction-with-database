import { TaskStatus } from '../task.model';

export class GetTasksFilterDto {
  status?: TaskStatus;  // ? one of them 
  search?: string;
}
