import {
  ForbiddenException,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { TaskUpdateStatusType } from './dto/update-task-status.dto';
import { TaskCreateType } from './dto/create-task.dto';
import * as moment from 'moment';
import { TaskUpdateType } from './dto/update-task.dto';

@Injectable()
export class TaskService {
  constructor(private readonly database: DatabaseService) {}
  private readonly logger = new Logger(TaskService.name);

  async getAll(ownerId: number) {
    try {
      const tasks = await this.database.todos.findMany({
        where: {
          assignToId: ownerId,
        },
      });

      return tasks;
    } catch (error) {
      this.logger.error(`Error while get all tasks: ${error}`);
      throw new InternalServerErrorException('Error while get all tasks');
    }
  }

  async getByCategories(categories: string, ownerId: number) {
    try {
      const tasks = await this.database.todos.findMany({
        where: {
          status: categories,
          ownerId: ownerId,
        },
      });

      return tasks;
    } catch (error) {
      this.logger.error(`Error while get task by category: ${error}`);
      throw new InternalServerErrorException(
        'Error while get task by category',
      );
    }
  }

  async createTask(payload: TaskCreateType, ownerId: number) {
    try {
      const { assignToId, title, description, status, dueDate } = payload;
      const assigned = await this.database.user.findFirst({
        where: {
          id: assignToId,
        },
      });

      if (!assigned) {
        this.logger.error(`No user found while creating task!: ${assigned}`);
        throw new NotFoundException('No user found!');
      }

      const dueAt = moment(dueDate).format();
      const task = await this.database.todos.create({
        data: {
          ownerId,
          title,
          status,
          description,
          dueAt,
          assignToId,
        },
      });

      if (!task) {
        this.logger.error(`Error while creating task: ${task}`);
        throw new InternalServerErrorException('Error while creating task!');
      }

      return task;
    } catch (error) {
      this.logger.error(`Error while creating task: ${error}`);
      throw new InternalServerErrorException('Error while creating task');
    }
  }

  async updateTask(id: number, payload: TaskUpdateType, ownerId: number) {
    const { assignToId, description, dueDate, title } = payload;

    const task = await this.database.todos.findFirst({
      where: {
        id,
      },
    });

    if (!task) {
      this.logger.error(`No task available to update: ${task}`);
      throw new NotFoundException('No task found!');
    }

    if (task.ownerId !== ownerId) {
      this.logger.error(
        `TaskId: ${task.id} with OwnerId: ${task.ownerId} want to updated with UserId: ${ownerId}`,
      );
      throw new ForbiddenException('Cannot update this task!');
    }

    const dueAt = moment(dueDate).format();
    const updatedTask = await this.database.todos.update({
      where: {
        id,
      },
      data: {
        assignToId,
        description,
        title,
        dueAt,
      },
    });

    if (!updatedTask) {
      this.logger.error(`Failed to update task!: ${updatedTask}`);
      throw new InternalServerErrorException('Failed to update task!');
    }

    return task;
  }

  async deleteTask(taskId: number, ownerId: number) {
    try {
      const task = await this.database.todos.findFirst({
        where: {
          id: taskId,
        },
      });

      if (!task) {
        this.logger.error(`No task found to delete: ${task}`);
        throw new InternalServerErrorException('No task found!');
      }

      if (task.ownerId !== ownerId) {
        this.logger.error(
          `TaskId: ${task.id} with OwnerId: ${task.ownerId} want to deleted with UserId: ${ownerId}`,
        );
        throw new ForbiddenException('Cannot delete this task!');
      }

      await this.database.todos.delete({
        where: {
          id: taskId,
        },
      });

      return 'success';
    } catch (error) {
      this.logger.error(`Error while delete task: ${error}`);
      throw new InternalServerErrorException('Error while delete task');
    }
  }

  async updateStatusTask(
    taskId: number,
    payload: TaskUpdateStatusType,
    ownerId: number,
  ) {
    try {
      const { status } = payload;
      const task = await this.database.todos.findFirst({
        where: {
          id: taskId,
        },
      });

      if (!task) {
        this.logger.error(`No task found to update status: ${task}`);
        throw new NotFoundException('No task found!');
      }

      if (task.ownerId !== ownerId || task.assignToId !== ownerId) {
        this.logger.error(
          `TaskId: ${task.id} want to updated with OwnerId: ${ownerId}, AssignId: ${task.assignToId}, TaskOwnerId: ${task.ownerId}`,
        );
        throw new ForbiddenException('Cannot update status of this task!');
      }

      const taskUpdated = await this.database.todos.update({
        where: {
          id: taskId,
        },
        data: {
          status: status,
        },
      });

      if (!taskUpdated) {
        this.logger.error(`cannot update task status: ${task}`);
        throw new InternalServerErrorException(
          'Error while updating task status!',
        );
      }

      return taskUpdated;
    } catch (error) {
      this.logger.error(`Error while update status task: ${error}`);
      throw new InternalServerErrorException('Error while update status task');
    }
  }
}
