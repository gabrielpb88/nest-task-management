import { Injectable } from '@nestjs/common';
import { Task, TaskStatus } from './task.model';
import { v4 as uuid } from 'uuid';
import { CreateTaskDto } from './dto/create-task.dto';

@Injectable()
export class TasksService {
  private tasks: Task[] = [];

  getAllTasks(): Task[] {
    return this.tasks;
  }

  getTaskById(id: string): Task {
    const task = this.tasks.find((task) => (task.id = id));
    if (!task) {
      throw new NotFoundException(`Task with id: ${id} not found`);
    }
    return task;
  }

  createTask(task: CreateTaskDto) {
    const createTask: Task = {
      ...task,
      status: TaskStatus.OPEN,
      id: uuid(),
    };
    this.tasks.push(createTask);
    return createTask;
  }
}
