import { Task } from '../task.entity';
import { TaskStatus } from '../task-status.enum';

export const taskMocked: Task = {
  id: 1,
  status: TaskStatus.OPEN,
  description: 'any_description',
  title: 'any_title',
  save: jest.fn(),
  hasId: jest.fn(),
  recover: jest.fn(),
  reload: jest.fn(),
  remove: jest.fn(),
  softRemove: jest.fn(),
};
