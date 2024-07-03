import { ApiProperty } from '@nestjs/swagger';
import { z } from 'zod';

export const TaskUpdateSchema = z.object({
  assignToId: z.number().min(0),
  title: z.string().min(1).max(200),
  description: z.string().min(1),
  dueDate: z.string().datetime().min(1),
});

export class TaskUpdateDtoSwagger {
  @ApiProperty({ example: 1 })
  assignToId: number;

  @ApiProperty({ example: 'Task 1' })
  title: string;

  @ApiProperty({ example: 'description task' })
  description: string;

  @ApiProperty({ example: '2020-01-01T00:00:00Z' })
  dueDate: string;
}

export type TaskUpdateType = z.infer<typeof TaskUpdateSchema>;
