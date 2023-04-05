import { Repository } from 'typeorm';
import { Task } from './task.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';

@Injectable()
export class TaskRepository extends Repository<Task> {
  constructor(
    @InjectRepository(Task)
    private readonly repository: Repository<Task>,
  ) {
    super(repository.target, repository.manager, repository.queryRunner);
  }

  async findById(id: number): Promise<Task> {
    return this.findOneBy({ id });
  }

  async getTasks(filter: GetTasksFilterDto) {
    const { status, search } = filter;
    const query = this.createQueryBuilder('task');

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
