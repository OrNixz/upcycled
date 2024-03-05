import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}

  @Get()
  findAllUsers(@Query('email') email: string) {
    return this.userService.findAll(email);
  }

  @Post()
  createUser(@Body() body: CreateUserDto) {
    return this.userService.create(body.name, body.email, body.password);
  }

  @Get('/:id')
  findUser(@Param('id') id: string) {
    return this.userService.findOneBy(parseInt(id));
  }
}
