import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';
import { User } from '../users/user.entity';

describe('AuthService', () => {
  let service: AuthService;
  let fakeUsersService: Partial<UsersService>;

  beforeEach(async () => {
    fakeUsersService = {
      findAll: () => Promise.resolve([]),
      create: (name: string, email: string, password: string) => {
        return Promise.resolve({ id: 1, name, email, password } as User);
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
    fakeUsersService.findAll = () => {
      return Promise.resolve([
        {
          id: 1,
          name: 'John Doe',
          email: 'johndoe@gmail.com',
          password:
            '7f524d3ec017487f.99e6a9469e0351ad562af8a876f40b996d93542659d3da7591e7a06cc590a7b15e88432dcbca53ffc3a63c439792f62d359ec966ce0fa14fdd5f720e3fa70713',
        } as User,
      ]);
    };

    const user = await service.login('johndoe@gmail.com', 'password');
    expect(user).toBeDefined();
  });
});
