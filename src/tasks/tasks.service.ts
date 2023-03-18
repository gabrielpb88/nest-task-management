import { Injectable } from '@nestjs/common';
import { Task, TaskStatus } from './task.model';
import { v4 as uuid } from 'uuid';

@Injectable()
export class TasksService {
  private tasks: Task[] = [];

  getAllTasks(): Task[] {
    return this.tasks;
  }

  createTask(task: Task) {
    const createTask: Task = { ...task };
    createTask.status = TaskStatus.OPEN;
    createTask.id = uuid();
    this.tasks.push(task);
    return createTask;
  }
}
