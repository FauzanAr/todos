import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import { LoginType } from './dto/login.dto';
import { compareHash } from 'src/helpers/utils/hash';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.usersService.findOneByEmail(email, true);
    if (!user && user.password === password) {
      return null;
    }

    const hashedPassword = await compareHash(password, user.password);
    if (!hashedPassword) {
      return null;
    }

    return user;
  }

  async login(data: LoginType) {
    const { email, password } = data;
    const user = await this.validateUser(email, password);
    if (!user) {
      throw new NotFoundException('No user found!');
    }

    const payload = { email: user.email, id: user.id };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
