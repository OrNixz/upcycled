import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  findAll() {
    return this.userRepository.find();
  }

  create(name: string, email: string, password: string) {
    const user = this.userRepository.create({ name, email, password });
    return this.userRepository.save(user);
  }

  findOneBy(id: number) {
    return this.userRepository.findOneBy({ id });
  }
}
