import { ApiProperty } from '@nestjs/swagger';
import { z } from 'zod';

export const CommentCreateSchema = z.object({
  todoId: z.number().min(1),
  comment: z.string().min(1),
});

export class CommentCreateDtoSwagger {
  @ApiProperty({ example: 1 })
  todoId: number;

  @ApiProperty({ example: 'Comment for task' })
  comment: string;
}

export type CommentCreateType = z.infer<typeof CommentCreateSchema>;
