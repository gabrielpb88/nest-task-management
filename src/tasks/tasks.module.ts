import { Module } from '@nestjs/common';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TaskRepository } from './task.repository';
import { Task } from './task.entity';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([Task]), AuthModule],
  providers: [TasksService, TaskRepository],
  controllers: [TasksController],
})
export class TasksModule {}
