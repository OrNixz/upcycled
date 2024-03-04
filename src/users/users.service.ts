import { Injectable, NotFoundException } from '@nestjs/common';
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

  async update(id: number, attrs: Partial<User>) {
    const user = await this.findOneBy(id);
    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
    Object.assign(user, attrs);
    return this.userRepository.save(user);
  }
}
