import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { CreateItemDto } from './dtos/create-item.dto';
import { ItemsService } from './items.service';
import { AuthGuard } from '../guards/auth.guard';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { User } from '../users/user.entity';

@Controller('items')
export class ItemsController {
  constructor(private itemsService: ItemsService) {}

  @Post()
  @UseGuards(AuthGuard)
  createItem(@Body() body: CreateItemDto, @CurrentUser() user: User) {
    return this.itemsService.create(body, user);
  }
}
