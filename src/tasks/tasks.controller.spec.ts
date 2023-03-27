import { Test, TestingModule } from '@nestjs/testing';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { TaskStatus } from './task-status.enum';
import { CreateTaskDto } from './dto/create-task.dto';

jest.mock('./tasks.service');

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

  it('should call service getTasks with correct params', () => {
    const spyGetTasks = jest.spyOn(service, 'getTasks');
    const filter: GetTasksFilterDto = {
      search: 'any_value',
      status: TaskStatus.OPEN,
    };
    controller.getTasks(filter);
    expect(spyGetTasks).toBeCalledWith(filter);
  });

  it('should call service getTaskById with correct values', () => {
    const spy = jest.spyOn(service, 'getTaskById');
    const id = 1;
    controller.getTaskById(id);
    expect(spy).toBeCalledWith(id);
  });

  it('should call service createTask with correct params', () => {
    const spyCreateTask = jest.spyOn(service, 'createTask');
    const task: CreateTaskDto = {
      title: 'any_title',
      description: 'any_description',
    };
    controller.createTask(task);
    expect(spyCreateTask).toBeCalledWith(task);
  });

  it('should call service removeTask with correct params', () => {
    const spyRemoveTask = jest.spyOn(service, 'removeTask');
    const id = 1;
    controller.removeTask(id);
    expect(spyRemoveTask).toBeCalledWith(id);
  });

  it('should call service updateTask with correct params', () => {
    const spyUpdateTask = jest.spyOn(service, 'updateTask');
    const id = 1;
    const status = TaskStatus.DONE;
    controller.updateTask(id, status);
    expect(spyUpdateTask).toBeCalledWith(id, status);
  });
});
