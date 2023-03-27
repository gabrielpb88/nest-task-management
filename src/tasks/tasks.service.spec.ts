import { Test, TestingModule } from '@nestjs/testing';
import { TasksService } from './tasks.service';
import { TaskRepository } from './task.repository';
import { NotFoundException } from '@nestjs/common';
import { TaskStatus } from './task-status.enum';
import { CreateTaskDto } from './dto/create-task.dto';
import { taskMocked } from './mocks/task.mock';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';

jest.mock('./task.repository');
jest.mock('./task.entity');

describe('TasksService', () => {
  let service: TasksService;
  let repository: TaskRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TasksService, TaskRepository],
    }).compile();

    service = module.get<TasksService>(TasksService);
    repository = module.get<TaskRepository>(TaskRepository);
  });

  it('should throw NotFoundException when task is not found', async () => {
    jest.spyOn(repository, 'findById');
    const promise = service.getTaskById(1);
    await expect(promise).rejects.toThrow(NotFoundException);
  });

  it('should return task when task is found', async () => {
    jest
      .spyOn(repository, 'findById')
      .mockReturnValueOnce(new Promise((resolve) => resolve(taskMocked)));
    const sut = await service.getTaskById(1);
    expect(sut).toEqual(taskMocked);
  });

  it('should call TaskRepository remove when valid param is passed', async () => {
    jest
      .spyOn(service, 'getTaskById')
      .mockReturnValueOnce(new Promise((resolve) => resolve(taskMocked)));

    const spyRepository = jest.spyOn(repository, 'remove');

    await service.removeTask(taskMocked.id);
    expect(spyRepository).toBeCalledTimes(1);
    expect(spyRepository).toBeCalledWith(taskMocked);
  });

  it('should create task when correct value is passed', async () => {
    const task: CreateTaskDto = {
      title: 'valid_task',
      description: 'valid_description',
    };
    const spySave = jest.spyOn(repository, 'createTask');
    await service.createTask(task);
    expect(spySave).toHaveBeenCalledWith(task);
  });

  it('should updated task when correct value is passed', async () => {
    jest
      .spyOn(service, 'getTaskById')
      .mockReturnValueOnce(new Promise((resolve) => resolve(taskMocked)));
    const spySave = jest.spyOn(repository, 'save');

    const taskStatus = TaskStatus.DONE;
    await service.updateTask(1, taskStatus);

    expect(spySave).toHaveBeenCalledWith({ ...taskMocked, status: taskStatus });
  });

  it('should call TaskRepository getTasks with correct params', async () => {
    const filter: GetTasksFilterDto = {
      status: TaskStatus.OPEN,
      search: 'any_text',
    };
    const expectedResponse = [];
    const spyGetTasks = jest
      .spyOn(repository, 'getTasks')
      .mockReturnValueOnce(new Promise((resolve) => resolve(expectedResponse)));

    const response = await service.getTasks(filter);
    expect(spyGetTasks).toHaveBeenCalledWith(filter);
    expect(response).toEqual(expectedResponse);
  });
});
