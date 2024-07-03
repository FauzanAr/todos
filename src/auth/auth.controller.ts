import { Body, Controller, Post } from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { LoginDtoSwagger, LoginSchema, LoginType } from './dto/login.dto';
import { ZodPipe } from 'src/zod/zod-pipe';
import { AuthService } from './auth.service';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @ApiBody({ type: LoginDtoSwagger })
  login(@Body(new ZodPipe(LoginSchema)) body: LoginType) {
    return this.authService.login(body);
  }
}
