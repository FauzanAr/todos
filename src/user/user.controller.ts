import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { ZodPipe } from 'src/zod/zod-pipe';
import {
  CreateUserDtoSwagger,
  UserCreateSchema,
  UserCreateType,
} from './dto/user-create.dto';
import { ApiBearerAuth, ApiBody, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { RequestWithUser } from './user.request.type';

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

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('access_token')
  @Get('email')
  findByEmail(@Req() req: RequestWithUser) {
    const email = req.user['email'];
    return this.userService.findOneByEmail(email);
  }
}
