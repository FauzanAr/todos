import {
    ForbiddenException,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { CommentCreateType } from './dto/create-comment.dto';
import { DatabaseService } from 'src/database/database.service';
import { TaskService } from 'src/task/task.service';

@Injectable()
export class CommentService {
  constructor(
    private readonly database: DatabaseService,
    private readonly taskService: TaskService,
  ) {}
  private readonly logger = new Logger(CommentService.name);
  async createComment(userId: number, body: CommentCreateType) {
    const { comment, todoId } = body;
    const task = await this.taskService.findById(todoId);
    if (!task) {
      this.logger.error(`No task found!: ${task}`);
      throw new NotFoundException('No Task Found!');
    }

    if (task.assignToId !== userId && task.ownerId !== userId) {
        this.logger.error(`task: ${JSON.stringify(task)}, userId: ${userId}`);
        throw new ForbiddenException('Cannot add comment to this task!');
    }

    const createComment = await this.database.comments.create({
      data: {
        comment,
        todoId,
        userId,
      },
    });

    if (!createComment) {
      this.logger.error(`Error while create comment!: ${createComment}`);
      throw new InternalServerErrorException('Error while create comment!');
    }

    return createComment;
  }
}
