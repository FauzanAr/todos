import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { ZodPipe } from 'src/zod/zod-pipe';
import {
  CreateUserDtoSwagger,
  UserCreateSchema,
  UserCreateType,
} from './dto/user-create.dto';
import { ApiBody, ApiTags } from '@nestjs/swagger';

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  findAll() {
    return this.userService.findUser();
  }

  @Post()
  @ApiBody({ type: CreateUserDtoSwagger })
  register(@Body(new ZodPipe(UserCreateSchema)) body: UserCreateType) {
    return this.userService.register(body);
  }

  @Get(':email')
  findByEmail(@Param('email') email: string) {
    return this.userService.findOneByEmail(email);
  }
}
