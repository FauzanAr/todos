import { ApiProperty } from '@nestjs/swagger';
import { z } from 'zod';

export const TaskUpdateStatusSchema = z.object({
  status: z.enum(['TODO', 'INPROG', 'DONE']),
});

export class TaskUpdateStatusDtoSwagger {
  @ApiProperty({ example: 'TODO | INPROG | DONE' })
  status: string;
}

export type TaskUpdateStatusType = z.infer<typeof TaskUpdateStatusSchema>;
