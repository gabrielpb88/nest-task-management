import { Test, TestingModule } from '@nestjs/testing';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';
import { TaskRepository } from './task.repository';

describe('TasksController', () => {
  let controller: TasksController;
  let service: TasksService;
  let repository: TaskRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TasksController],
      providers: [TasksService, TaskRepository],
    }).compile();

    controller = module.get<TasksController>(TasksController);
    service = module.get<TasksService>(TasksService);
    repository = module.get<TaskRepository>(TaskRepository);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  // it('should call service getAllTasks when getAllTasks', () => {
  //   const spyGetAllTasks = jest.spyOn(service, 'getAllTasks');
  //   controller.getAllTasks();
  //   expect(spyGetAllTasks).toBeCalledTimes(1);
  // });
  //
  // it('should call service getTaskById with correct values', () => {
  //   const spy = jest.spyOn(service, 'getTaskById');
  //   spy.mockImplementationOnce((id: string) => ({} as Task));
  //   const id = 'any_id';
  //   controller.getTaskById(id);
  //   expect(spy).toBeCalledWith(id);
  // });
  //
  // it('should call service createTask with correct params', () => {
  //   const spyCreateTask = jest.spyOn(service, 'createTask');
  //   const task: CreateTaskDto = {
  //     title: 'any_title',
  //     description: 'any_description',
  //   };
  //   controller.createTask(task);
  //   expect(spyCreateTask).toBeCalledWith(task);
  //   expect(spyCreateTask).toBeCalledTimes(1);
  // });
  //
  // it('should call service removeTask with correct params', () => {
  //   const spyRemoveTask = jest
  //     .spyOn(service, 'removeTask')
  //     .mockImplementationOnce(() => null);
  //   const id = 'valid_id';
  //   controller.removeTask(id);
  //   expect(spyRemoveTask).toBeCalledWith(id);
  // });
  //
  // it('should call service updateTask with correct params', () => {
  //   const spyUpdateTask = jest
  //     .spyOn(service, 'updateTask')
  //     .mockImplementationOnce(() => null);
  //   const id = 'valid_id';
  //   const status = TaskStatus.DONE;
  //   controller.updateTask(id, status);
  //   expect(spyUpdateTask).toBeCalledWith(id, status);
  // });
});
