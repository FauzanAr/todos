import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { UserCreateType } from './dto/user-create.dto';
import { hash } from 'src/helpers/utils/hash';

@Injectable()
export class UserService {
  constructor(private readonly database: DatabaseService) {}

  async findOneByEmail(email: string) {
    try {
      const user = await this.database.user.findFirst({
        where: {
          email,
        },
      });

      if (!user) {
        // AddLog
        throw new NotFoundException('No user found!');
      }

      return user;
    } catch (error) {
      // AddLog
      throw new InternalServerErrorException('Error while find by email');
    }
  }

  async findUser() {
    try {
      const users = await this.database.user.findMany({
        select: {
          id: true,
          name: true,
          email: true,
        },
      });

      if (!users) {
        // AddLog
        throw new InternalServerErrorException('Error while getting users');
      }

      return users;
    } catch (error) {
      // AddLog
      throw new InternalServerErrorException('Error while get user');
    }
  }

  async register(body: UserCreateType) {
    try {
      const { email, name, password } = body;
      const hashedPass = await hash(password);
      const user = await this.database.user.create({
        data: {
          email: email,
          name: name,
          password: hashedPass,
        },
      });

      if (!user) {
        // AddLog
        throw new InternalServerErrorException(
          'Error while saving data to database',
        );
      }

      delete user.password;
      return user;
    } catch (error) {
      // AddLog
      throw new InternalServerErrorException('Error while create user');
    }
  }
}
