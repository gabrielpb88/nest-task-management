import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task, TaskStatus } from './task.model';
import { CreateTaskDto } from './dto/create-task.dto';

@Controller('tasks')
export class TasksController {
  constructor(private taskService: TasksService) {}

  @Get()
  getAllTasks(): Task[] {
    return this.taskService.getAllTasks();
  }

  @Get('/:id')
  getTaskById(@Param('id') id: string): Task {
    return this.taskService.getTaskById(id);
  }

  @Post()
  createTask(@Body() task: CreateTaskDto): Task {
    return this.taskService.createTask(task);
  }

  @Delete('/:id')
  removeTask(@Param('id') id: string): void {
    return this.taskService.removeTask(id);
  }

  @Patch('/:id/status')
  updateTask(@Param('id') id: string, @Body() status: TaskStatus): Task {
    return this.taskService.updateTask(id, status);
  }
}
