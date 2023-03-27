import { DeleteResult, Repository } from 'typeorm';
import { Task } from './task.entity';
import { TaskStatus } from './task-status.enum';
import { CreateTaskDto } from './dto/create-task.dto';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';

@Injectable()
export class TaskRepository {
  constructor(
    @InjectRepository(Task) private readonly repository: Repository<Task>,
  ) {}
  async createTask(createTaskDto: CreateTaskDto): Promise<Task> {
    const { title, description } = createTaskDto;

    const task = this.repository.create();
    task.title = title;
    task.description = description;
    task.status = TaskStatus.OPEN;
    await this.repository.save(task);

    return task;
  }

  async save(task: Task): Promise<Task> {
    return this.repository.save(task);
  }

  async findById(id: number): Promise<Task> {
    return this.repository.findOneBy({ id });
  }

  async remove(task: Task): Promise<DeleteResult> {
    return this.repository.delete(task.id);
  }

  async getTasks(filter: GetTasksFilterDto) {
    const { status, search } = filter;
    const query = this.repository.createQueryBuilder('task');

    if (status) {
      query.andWhere('task.status = :status', { status });
    }

    if (search) {
      query.andWhere(
        'task.title LIKE :search OR task.description LIKE :search',
        { search: `%${search}%` },
      );
    }

    return query.getMany();
  }
}
