import { Task } from '../task.entity';
import { TaskStatus } from '../task-status.enum';
import { User } from '../../auth/user.entity';

export const taskMocked: Task = {
  id: 1,
  status: TaskStatus.OPEN,
  description: 'any_description',
  title: 'any_title',
  user: new User(),
  save: jest.fn(),
  hasId: jest.fn(),
  recover: jest.fn(),
  reload: jest.fn(),
  remove: jest.fn(),
  softRemove: jest.fn(),
};
