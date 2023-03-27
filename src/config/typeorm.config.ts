import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Task } from '../tasks/task.entity';

export const typeormConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'pass',
  database: 'taskmanagement',
  entities: [Task],
  synchronize: true,
};
