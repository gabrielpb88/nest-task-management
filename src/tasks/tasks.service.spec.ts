import { Test, TestingModule } from '@nestjs/testing';
import { TasksService } from './tasks.service';
import { NotFoundException } from '@nestjs/common';
import { Task, TaskStatus } from './task.model';
import { CreateTaskDto } from './dto/create-task.dto';
import * as uuid from 'uuid';
jest.mock('uuid');

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

  it('should create task when correct value is passed', () => {
    const task: CreateTaskDto = {
      title: 'valid_task',
      description: 'valid_description',
    };
    jest.spyOn(uuid, 'v4').mockReturnValueOnce('any_id');
    const taskCreated = service.createTask(task);
    expect(taskCreated.id).toBe('any_id');
  });
});
