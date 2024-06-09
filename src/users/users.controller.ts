import { Controller,Body, Delete, Get, Param, Post, Put  } from '@nestjs/common';
import { UsersService } from './users.service';
import { UserDto } from './dto/user.dto';
import { ApiTags, ApiCreatedResponse, ApiResponse } from '@nestjs/swagger';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @ApiCreatedResponse({ description: 'The records have been successfully fetched.', type: UserDto, isArray: true })
  @ApiResponse({ status: 404, description: 'Users not found' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  @ApiResponse({ status: 200, description: 'Users fetched successfully' })
  async fetchUsers() {
    return await this.usersService.findAll();
  }

  @Get(':userId')
  @ApiResponse({ status: 404, description: 'User not found' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  @ApiResponse({ status: 200, description: 'User fetched successfully' })
  @ApiCreatedResponse({ description: 'The record has been successfully fetched.', type: UserDto })
  async fetchUser(@Param('userId') userId: string) {
    return await this.usersService.findOneById(userId);
  }

  @Post()
  @ApiResponse({ status: 404, description: 'User not found' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  @ApiResponse({ status: 201, description: 'User created successfully' })
  @ApiCreatedResponse({ description: 'The record has been successfully created.', type: UserDto })
  async createUser(@Body() user: UserDto) {
    return await this.usersService.insert(user);
  }

  @Put(':userId')
  @ApiResponse({ status: 404, description: 'User not found' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  @ApiResponse({ status: 200, description: 'User updated successfully' })
  @ApiCreatedResponse({ description: 'The record has been successfully updated.', type: UserDto })
  async updateUser(@Param('userId') userId: string, @Body() user: UserDto) {
    return this.usersService.updateUser(userId, user);
  }

  @Delete(':userId')
  @ApiResponse({ status: 404, description: 'User not found' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  @ApiResponse({ status: 200, description: 'User deleted successfully' })
  @ApiCreatedResponse({ description: 'The record has been successfully deleted.', type: UserDto })
  async deleteUser(@Param('userId') userId: string) {
    return await this.usersService.deleteOneById(userId);
  }
}
