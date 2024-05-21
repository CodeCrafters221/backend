import { Body, Controller, Post } from '@nestjs/common';
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { User } from 'src/users/graphql/users.entity';
import { UserInput } from 'src/users/graphql/users.input';
// import { IUser } from 'src/users/interfaces/user.interface';
import { AuthService } from './auth.service';
import { Session } from './graphql/session.type';
import { UserDto, IUser } from 'src/users/dto/user.schema';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiBody({ type: User })
  @ApiResponse({ status: 201, type: Session })
  @ApiResponse({ status: 404, description: 'Verifier vos informations' })
  @Post('register')
  // register(@Body() user: IUser): Promise<Session> {
  register(@Body() user: UserDto): Promise<Session> {
    return this.authService.register(user);
  }

  @ApiBody({ type: UserInput })
  @ApiResponse({ status: 201, type: Session })
  @ApiResponse({ status: 404, description: 'Verifier vos credentials' })
  @Post('login')
  // login(@Body() credentials: IUser): Promise<Session> {
  login(@Body() credentials: IUser): Promise<Session> {
    return this.authService.login(credentials);
  }
}
