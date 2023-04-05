import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { TaskRepository } from './task.repository';
import { Task } from './task.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { TaskStatus } from './task-status.enum';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { User } from '../auth/user.entity';

@Injectable()
export class TasksService {
  constructor(
    @Inject(TaskRepository)
    private taskRepository: TaskRepository,
  ) {}

  async getTasks(filter: GetTasksFilterDto): Promise<Task[]> {
    return this.taskRepository.getTasks(filter);
  }

  async getTaskById(id: number): Promise<Task> {
    const found = await this.taskRepository.findById(id);
    if (!found) {
      throw new NotFoundException(`Task with id: ${id} not found`);
    }
    return found;
  }

  async createTask(createTaskDto: CreateTaskDto, user: User): Promise<Task> {
    const { title, description } = createTaskDto;
    const task = this.taskRepository.create();
    task.title = title;
    task.description = description;
    task.status = TaskStatus.OPEN;
    task.user = user;
    return await this.taskRepository.save(task);
  }

  async removeTask(id: number): Promise<void> {
    const found = await this.getTaskById(id);
    await this.taskRepository.remove(found);
  }

  async updateTask(id: number, status: TaskStatus): Promise<Task> {
    const task = await this.getTaskById(id);
    task.status = status;
    await this.taskRepository.save(task);
    return task;
  }
}
