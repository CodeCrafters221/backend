/* eslint-disable prettier/prettier */
import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import { UsersService } from 'src/users/users.service';
import { Session } from './graphql/session.type';
import * as bcrypt from 'bcrypt';
import { UserDto, IUser } from 'src/users/dto/user.dto';
@Injectable()
export class AuthService {
  constructor(private readonly userService: UsersService) {}

  saltOrRounds = 10;
  /**
   *
   * @param user
   * @returns Promise<Session>
   * @description
   * This function is used to register a new user.
   * It takes a user object as input and returns a session object.
   * The session object contains the user object and the token.
   * The token is used to authenticate the user.
   */
  async register(user: UserDto): Promise<Session> {
    console.log('AUTH SERVICE: user', user);
    user.password = await bcrypt.hash(user.password, this.saltOrRounds); // hashing the password before inserting to database
    let newUser = await this.userService.insert(user);
    const token = jwt.sign({ data: newUser }, 'secret', { expiresIn: '1h' });
    newUser = newUser.toObject();
    console.log('AUTH SERVICE: newUser', newUser);
    delete newUser.password;
    delete newUser.__v;
    return { user: newUser, token };
  }

  /*
    @param credentials
    @returns Session
    @description
    This function is used to login a user.
    It takes a user object as input and returns a session object.
    The session object contains the user object and the token.
    The token is used to authenticate the user.
  */
  async login(credentials: IUser): Promise<Session> {
    let user = await this.userService.findByEmail(credentials.email);
    const isMatch = await bcrypt.compare(credentials.password, user.password); // comparing the password with bcrypt
    if (!user || !isMatch) {
      throw new UnauthorizedException(); // changed the notFoundException to the 401 error
    }
    user = user.toObject();
    delete user.password;
    delete user.__v;
    const token = jwt.sign({ data: user }, 'secret', { expiresIn: '1h' });
    return { user, token };
  }




  /**
   * 
   * @param userId 
   * @param user 
   * @description
   * This function is used to update a user.
   * It takes a user object as input and returns a user object.
   * The user object contains the user object and the token.
   * The token is used to authenticate the user.
   */
  async updateUser(userId: string, user: UserDto) {
    return this.userService.updateUser(userId, user);
  }


  /**
   *
   * @param token
   * @returns boolean or IUser
   * @description
   * This function is used to verify the token.
   * It takes a token as input and returns a user object.
   * The user object contains the user object and the token.
   * The token is used to authenticate the user.
   */
  async isTokenValid(token: string): Promise<boolean | IUser> {
    return new Promise((resolve, reject) => {
      jwt.verify(token, 'secret', (err, result) => {
        if (err) reject(err);
        else resolve(result.data);
      });
    });
  }
}
