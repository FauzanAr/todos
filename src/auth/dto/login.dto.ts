import { ApiProperty } from '@nestjs/swagger';
import { z } from 'zod';

export const LoginSchema = z.object({
  email: z.string().email().min(0),
  password: z.string().min(6),
});

export class LoginDtoSwagger {
  @ApiProperty({ example: 'mail@example.com' })
  email: string;

  @ApiProperty({ example: '123456' })
  password: string;
}

export type LoginType = z.infer<typeof LoginSchema>;
