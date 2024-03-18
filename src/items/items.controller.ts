import { Body, Controller, Post } from '@nestjs/common';
import { CreateItemDto } from './dtos/create-item.dto';

@Controller('items')
export class ItemsController {
  @Post()
  createItem(@Body() body: CreateItemDto) {
    return 'This action adds a new item';
  }
}
