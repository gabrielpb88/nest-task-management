import { BadRequestException, PipeTransform } from '@nestjs/common';
import { TaskStatus } from '../task-status.enum';

export class TaskStatusValidatorPipe implements PipeTransform {
  transform(value: string) {
    const allowedStatus = [
      TaskStatus.OPEN,
      TaskStatus.IN_PROGRESS,
      TaskStatus.DONE,
    ];

    const isAllowed = allowedStatus.includes(TaskStatus[value.toUpperCase()]);

    if (!isAllowed) {
      throw new BadRequestException(`${value} is not allowed`);
    }
    return value.toUpperCase();
  }
}
