import { Test, TestingModule } from '@nestjs/testing';
import { TasksService } from './tasks.service';
import { TaskRepository } from './task.repository';
import { NotFoundException } from '@nestjs/common';

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
    jest
      .spyOn(repository, 'findById')
      .mockReturnValueOnce(
        new Promise((resolve, reject) => reject(new NotFoundException())),
      );

    const promise = service.getTaskById(1);

    await expect(promise).rejects.toThrow(NotFoundException);
  });
  //
  // it('should remove task when correct value is passed', () => {
  //   const task: Task = {
  //     id: 'valid_id',
  //     title: 'valid_task',
  //     description: 'valid_description',
  //     status: TaskStatus.OPEN,
  //   };
  //   const spyGetTaskById = jest
  //     .spyOn(service, 'getTaskById')
  //     .mockReturnValueOnce(task);
  //   service.removeTask('valid_id');
  //   expect(spyGetTaskById).toBeCalledTimes(1);
  //   expect(spyGetTaskById).toBeCalledWith(task.id);
  // });
  //
  // it('should create task when correct value is passed', () => {
  //   const task: CreateTaskDto = {
  //     title: 'valid_task',
  //     description: 'valid_description',
  //   };
  //   jest.spyOn(uuid, 'v4').mockReturnValueOnce('any_id');
  //   const taskCreated = service.createTask(task);
  //   expect(taskCreated.id).toBe('any_id');
  // });
  //
  // it('should updated task when correct value is passed', () => {
  //   jest.spyOn(service, 'getTaskById').mockReturnValueOnce({
  //     id: 'valid_id',
  //     title: 'valid_title',
  //     description: 'valid_description',
  //     status: TaskStatus.OPEN,
  //   });
  //   const updateTask = service.updateTask('valid_id', TaskStatus.DONE);
  //   expect(updateTask.status).toBe(TaskStatus.DONE);
  // });
});
