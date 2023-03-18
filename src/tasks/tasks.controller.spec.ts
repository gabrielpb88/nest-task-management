import { Test, TestingModule } from '@nestjs/testing';
import { TasksController } from './tasks.controller';
import spyOn = jest.spyOn;
import { TasksService } from './tasks.service';

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
});
