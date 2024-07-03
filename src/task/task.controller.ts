import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { TaskService } from './task.service';
import { ApiBody } from '@nestjs/swagger';
import {
  TaskCreateDtoSwagger,
  TaskCreateSchema,
  TaskCreateType,
} from './dto/create-task.dto';
import { ZodPipe } from 'src/zod/zod-pipe';
import {
  TaskUpdateDtoSwagger,
  TaskUpdateSchema,
  TaskUpdateType,
} from './dto/update-task.dto';
import {
  TaskUpdateStatusDtoSwagger,
  TaskUpdateStatusSchema,
  TaskUpdateStatusType,
} from './dto/update-task-status.dto';

@Controller('task')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Get()
  getAll() {
    return this.taskService.getAll();
  }

  @Get(':category')
  getByCategory(@Param('category') category: string) {
    return this.taskService.getByCategories(category);
  }

  @Post()
  @ApiBody({ type: TaskCreateDtoSwagger })
  createTask(@Body(new ZodPipe(TaskCreateSchema)) task: TaskCreateType) {
    return this.taskService.createTask(task);
  }

  @Put(':id')
  @ApiBody({ type: TaskUpdateDtoSwagger })
  updateTask(
    @Param('id') id: string,
    @Body(new ZodPipe(TaskUpdateSchema)) task: TaskUpdateType,
  ) {
    return this.taskService.updateTask(+id, task);
  }

  @Delete(':id')
  deleteTask(@Param('id') id: string) {
    return this.taskService.deleteTask(+id);
  }

  @Put('status/:id')
  @ApiBody({ type: TaskUpdateStatusDtoSwagger })
  updateTaskStatus(
    @Param('id') id: string,
    @Body(new ZodPipe(TaskUpdateStatusSchema)) task: TaskUpdateStatusType,
  ) {
    return this.taskService.updateStatusTask(+id, task);
  }
}
