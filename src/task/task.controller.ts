import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import { TaskService } from './task.service';
import { ApiBearerAuth, ApiBody, ApiTags } from '@nestjs/swagger';
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
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { RequestWithUser } from 'src/user/user.request.type';

@ApiTags('Task')
@Controller('task')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('access_token')
  @Get()
  getAll(@Req() req: RequestWithUser) {
    const userId = req.user['userId'];
    return this.taskService.getAll(+userId);
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
