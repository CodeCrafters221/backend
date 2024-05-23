/* eslint-disable prettier/prettier */
import { Body, Controller, Param, Post } from '@nestjs/common';
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { User } from 'src/users/graphql/users.entity';
import { UserInput } from 'src/users/graphql/users.input';
// import { IUser } from 'src/users/interfaces/user.interface';
import { AuthService } from './auth.service';
import { Session } from './graphql/session.type';
import { UserDto, IUser } from 'src/users/dto/user.dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiBody({ type: User })
  @ApiResponse({ status: 201, type: Session })
  @ApiResponse({ status: 404, description: 'Verifier vos informations' })
  @Post('register')
  register(@Body() user: UserDto): Promise<Session> {
    return this.authService.register(user);
  }

  @ApiBody({ type: UserInput })
  @ApiResponse({ status: 201, type: Session })
  @ApiResponse({ status: 404, description: 'Verifier vos credentials' })
  @Post('login')
  login(@Body() credentials: IUser): Promise<Session> {
    return this.authService.login(credentials);
  }





  @ApiBody({ type: UserDto })
  @ApiResponse({ status: 200, type: UserDto })
  @ApiResponse({ status: 404, description: 'Verifier vos informations' })
  @Post('update/:userId')
  async updateUser(@Body() user: UserDto, @Param('userId') userId: string) {
    console.log("AUTH CONTROLLER: user payload: ",user, userId)
    const result = await this.authService.updateUser(userId, user);
    console.log("AUTH CONTROLLER: update user method", result);
    return result
  }
}
