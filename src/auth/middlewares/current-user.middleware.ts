import { NestMiddleware } from '@nestjs/common';
import { UsersService } from '../../users/users.service';
import { NextFunction, Request, Response } from 'express';
import { User } from '../../users/user.entity';

declare global {
  namespace Express {
    interface Request {
      currentUser?: User;
    }
  }
}

export class CurrentUserMiddleware implements NestMiddleware {
  constructor(private usersService: UsersService) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const { userId } = req.session || {};

    if (userId) {
      const user = await this.usersService.findOneBy(userId);
      req.currentUser = user;
    }

    next();
  }
}
