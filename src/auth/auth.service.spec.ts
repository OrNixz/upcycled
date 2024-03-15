import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';
import { User } from '../users/user.entity';

describe('AuthService', () => {
  let service: AuthService;
  let fakeUsersService: Partial<UsersService>;

  beforeEach(async () => {
    const users: User[] = [];

    fakeUsersService = {
      findAll: (email: string) => {
        const user = users.filter((user) => user.email === email);
        return Promise.resolve(user);
      },
      create: (name: string, email: string, password: string) => {
        const user = {
          id: Math.floor(Math.random() * 999),
          name,
          email,
          password,
        } as User;

        users.push(user);
        // console.log(users)
        console.log(user);
        return Promise.resolve(user);
      },
    };
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        { provide: UsersService, useValue: fakeUsersService },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a new user with a salted and hashed password', async () => {
    const user = await service.register(
      'John Doe',
      'johndoe@gmail.com',
      'password',
    );
    expect(user.name).toEqual('John Doe');
    expect(user.password).not.toEqual('password');
    const [salt, hash] = user.password.split('.');
    expect(salt).toBeDefined();
    expect(hash).toBeDefined();
  });

  it('should throw an error if the email is in use', async () => {
    fakeUsersService.findAll = () => {
      return Promise.resolve([
        {
          id: 1,
          name: 'John Doe',
          email: 'johndoe@gmail.com',
          password: 'password',
        } as User,
      ]);
    };
    await expect(
      service.register('John Doe', 'johndoe@gmail.com', 'password'),
    ).rejects.toThrow('Email in use');
  });

  it('should throw an error if user logged in with invalid email', async () => {
    await expect(service.login('admin@gmail.com', 'password')).rejects.toThrow(
      'User not found',
    );
  });

  it('should throw an error if user logged in with invalid password', async () => {
    fakeUsersService.findAll = () => {
      return Promise.resolve([
        {
          id: 1,
          name: 'John Doe',
          email: 'johndoe@gmail.com',
          password: 'password',
        } as User,
      ]);
    };

    await expect(
      service.login('johndoe@gmail.com', 'password'),
    ).rejects.toThrow('Invalid password');
  });

  it('should return a user if correct email and password are provided', async () => {
    await service.register('John Doe', 'johndoe@gmail.com', 'password');
    const user = await service.login('johndoe@gmail.com', 'password');
    expect(user).toBeDefined();
  });
});
