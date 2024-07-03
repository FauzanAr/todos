import { Injectable, NotFoundException } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class UserService {
    constructor(private readonly database: DatabaseService) {}

    async findOneByEmail(email: string) {
        const user = await this.database.user.findFirst({
            where: {
                email
            }
        });

        if (!user) {
            throw new NotFoundException("No user found!");
        }

        return user;
    }
}
