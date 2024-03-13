import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';
import { User } from '../users/user.entity';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(async () => {
    const fakeUsersService: Partial<UsersService> = {
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
});
