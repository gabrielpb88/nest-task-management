import { Test, TestingModule } from '@nestjs/testing';
import { TasksService } from './tasks.service';
import { NotFoundException } from '@nestjs/common';
import { Task, TaskStatus } from './task.model';

describe('TasksService', () => {
  let service: TasksService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TasksService],
    }).compile();

    service = module.get<TasksService>(TasksService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should throw NotFoundException when task is not found', () => {
    expect(() => {
      service.getTaskById('id_not_found');
    }).toThrow(NotFoundException);
  });

  it('should remove task when correct value is passed', () => {
    const task: Task = {
      id: 'valid_id',
      title: 'valid_task',
      description: 'valid_description',
      status: TaskStatus.OPEN,
    };
    const spyGetTaskById = jest
      .spyOn(service, 'getTaskById')
      .mockReturnValueOnce(task);
    service.removeTask('valid_id');
    expect(spyGetTaskById).toBeCalledTimes(1);
    expect(spyGetTaskById).toBeCalledWith(task.id);
  });
});
