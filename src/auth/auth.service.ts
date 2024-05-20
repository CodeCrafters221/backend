import { Injectable, UnauthorizedException } from '@nestjs/common';
import { IUser } from 'src/users/interfaces/user.interface';
import * as jwt from 'jsonwebtoken';
import { UsersService } from 'src/users/users.service';
import { Session } from './dto/session.type';
import * as bcrypt from 'bcrypt';
@Injectable()
export class AuthService {
  constructor(private readonly userService: UsersService) {}

  saltOrRounds = 10;
  async register(user: IUser): Promise<Session> {
    user.password = await bcrypt.hash(user.password, this.saltOrRounds); // hashing the password before inserting to database
    let newUser = await this.userService.insert(user);
    const token = jwt.sign({ data: newUser }, 'secret', { expiresIn: '1h' });
    newUser = newUser.toObject();
    delete newUser.password;
    return { user: newUser, token };
  }

  async login(credentials: IUser): Promise<Session> {
    let user = await this.userService.findByEmail(credentials.email);
    const isMatch = await bcrypt.compare(credentials.password, user.password); // comparing the password with bcrypt
    if (!user || !isMatch) {
      throw new UnauthorizedException(); // changed the notFoundException to the 401 error
    }
    user = user.toObject();
    delete user.password;
    const token = jwt.sign({ data: user }, 'secret', { expiresIn: '1h' });
    return { user, token };
  }

  async isTokenValid(token: string): Promise<boolean | IUser> {
    return new Promise((resolve, reject) => {
      jwt.verify(token, 'secret', (err, result) => {
        if (err) reject(err);
        else resolve(result.data);
      });
    });
  }
}
