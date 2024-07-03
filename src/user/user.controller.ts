import { Controller, Get, Param } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Get(':email')
    findByEmail(@Param('email') email: string) {
        return this.userService.findOneByEmail(email);
    }
}
