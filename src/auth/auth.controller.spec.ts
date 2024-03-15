import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { UsersService } from '../users/users.service';
import { AuthService } from './auth.service';
import { User } from '../users/user.entity';

describe('AuthController', () => {
  let controller: AuthController;
  let fakeUsersService: Partial<UsersService>;
  let fakeAuthService: Partial<AuthService>;

  beforeEach(async () => {
    fakeUsersService = {};
    fakeAuthService = {
      register: (name: string, email: string, password: string) => {
        return Promise.resolve({ id: 1, name, email, password } as User);
      },
      login: (email: string, password: string) => {
        return Promise.resolve({ id: 1, email, password } as User);
      },
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        { provide: UsersService, useValue: fakeUsersService },
        { provide: AuthService, useValue: fakeAuthService },
      ],
      controllers: [AuthController],
    }).compile();

    controller = module.get<AuthController>(AuthController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should return a user on login', async () => {
    const session = { userId: -10 };
    const user = await controller.login(
      { email: 'johndoe@gmail.com', password: 'password' },
      session,
    );
    expect(user).toEqual({
      id: 1,
      email: 'johndoe@gmail.com',
      password: 'password',
    });
    expect(session.userId).toEqual(1);
  });

  it('should return a user on register', async () => {
    const session = { userId: -10 };
    const user = await controller.register(
      { name: 'John Doe', email: 'johndoe@gmail.com', password: 'password' },
      session,
    );
    expect(user).toEqual({
      id: 1,
      name: 'John Doe',
      email: 'johndoe@gmail.com',
      password: 'password',
    });
    expect(session.userId).toEqual(1);
  });

  it('should clear session on logout', () => {
    const session = { userId: 1 };
    controller.logout(session);
    expect(session.userId).toBeNull();
  });
});
