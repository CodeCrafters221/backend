import { Injectable, NotFoundException } from '@nestjs/common';
import { IUser } from 'src/users/interfaces/user.interface';
import * as jwt from 'jsonwebtoken';
import { UsersService } from 'src/users/users.service';
import { Session } from './dto/session.type';

@Injectable()
export class AuthService {

  constructor(private readonly userService: UsersService) {}


  async register(user: IUser): Promise<Session> {
    let newUser = await this.userService.insert(user);
    const token = jwt.sign({ data: newUser }, 'secret', { expiresIn: '1h' })
    newUser = newUser.toObject();
    delete newUser.password;
    return { user: newUser, token };
}

async login(credentials: IUser): Promise<Session> {
    let user = await this.userService.findByEmail(credentials.email);
    if(user.password !== credentials.password) {
        throw new NotFoundException();
    }
    user = user.toObject();
    delete user.password;
    const token = jwt.sign({ data: user }, 'secret', { expiresIn: '1h' })
    return { user, token };
}

async isTokenValid(token: string): Promise<boolean | IUser> {
    return new Promise((resolve, reject) => {
        jwt.verify(token, 'secret', (err, result) => {
            if(err) {
                resolve(false);
            } else {
                resolve(result.data);
            }
        })
    });
}
}
