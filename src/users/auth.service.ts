import { BadRequestException, Injectable } from '@nestjs/common';
import { UsersService } from './users.service';

@Injectable()
export class AuthService {
  constructor(private userService: UsersService) {}

  async register(name: string, email: string, password: string) {
    const users = await this.userService.findAll(email);
    if (!users.length) {
      throw new BadRequestException('Email in use');
    }
  }
}
