import { ApiProperty } from '@nestjs/swagger';
import { z } from 'zod';

export const UserCreateSchema = z.object({
  email: z.string().email().min(1),
  name: z.string().min(1),
  password: z.string().min(6),
});

export class CreateUserDtoSwagger {
  @ApiProperty({ example: 'user@example.com' })
  email: string;

  @ApiProperty({ example: 'John Doe' })
  name: string;

  @ApiProperty({ example: 'password' })
  password: string;
}

export type UserCreateType = z.infer<typeof UserCreateSchema>;
