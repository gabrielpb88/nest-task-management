import { Test, TestingModule } from '@nestjs/testing';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';
import { Task } from './task.model';

describe('TasksController', () => {
  let controller: TasksController;
  let service: TasksService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TasksController],
      providers: [TasksService],
    }).compile();

    controller = module.get<TasksController>(TasksController);
    service = module.get<TasksService>(TasksService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should call service getAllTasks when getAllTasks', () => {
    const spyGetAllTasks = jest.spyOn(service, 'getAllTasks');
    controller.getAllTasks();
    expect(spyGetAllTasks).toBeCalledTimes(1);
  });

  it('should call service createTask with correct params', () => {
    const spyCreateTask = jest.spyOn(service, 'createTask');
    const task: Task = {
      title: 'any_title',
      description: 'any_description',
    };
    controller.createTask(task);
    expect(spyCreateTask).toBeCalledWith(task);
    expect(spyCreateTask).toBeCalledTimes(1);
  });
});
