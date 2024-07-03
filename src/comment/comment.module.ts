import { Module } from '@nestjs/common';
import { CommentService } from './comment.service';
import { CommentController } from './comment.controller';
import { DatabaseModule } from 'src/database/database.module';
import { TaskModule } from 'src/task/task.module';

@Module({
  imports: [DatabaseModule, TaskModule],
  providers: [CommentService],
  controllers: [CommentController],
})
export class CommentModule {}
