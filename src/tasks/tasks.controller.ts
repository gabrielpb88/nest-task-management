import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task } from './task.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { TaskStatus } from './task-status.enum';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { TaskStatusValidatorPipe } from './pipes/task-status-validator.pipe';
import { AuthGuard } from '@nestjs/passport';

@UseGuards(AuthGuard())
@Controller('tasks')
export class TasksController {
  constructor(private taskService: TasksService) {}

  @Get()
  async getTasks(@Query() filter: GetTasksFilterDto): Promise<Task[]> {
    return this.taskService.getTasks(filter);
  }

  @Get('/:id')
  getTaskById(@Param('id', ParseIntPipe) id: number): Promise<Task> {
    return this.taskService.getTaskById(id);
  }

  @Post()
  createTask(@Body() task: CreateTaskDto): Promise<Task> {
    return this.taskService.createTask(task);
  }

  @Delete('/:id')
  removeTask(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.taskService.removeTask(id);
  }

  @Patch('/:id/status')
  updateTask(
    @Param('id', ParseIntPipe) id: number,
    @Body('status', TaskStatusValidatorPipe) status: TaskStatus,
  ): Promise<Task> {
    return this.taskService.updateTask(id, status);
  }
}
