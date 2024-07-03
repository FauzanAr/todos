import { ApiProperty } from '@nestjs/swagger';
import { z } from 'zod';

export const TaskCreateSchema = z.object({
  assignToId: z.number().min(0),
  title: z.string().min(1).max(200),
  description: z.string().min(1),
  status: z.enum(['TODO', 'INPROG', 'DONE']),
  dueDate: z.string().datetime().min(1),
});

export class TaskCreateDtoSwagger {
  @ApiProperty({ example: 1 })
  assignToId: number;

  @ApiProperty({ example: 'Task 1' })
  title: string;

  @ApiProperty({ example: 'description task' })
  description: string;

  @ApiProperty({ example: 'TODO | INPROG | DONE' })
  status: string;

  @ApiProperty({ example: '2020-01-01T00:00:00Z' })
  dueDate: string;
}

export type TaskCreateType = z.infer<typeof TaskCreateSchema>;
