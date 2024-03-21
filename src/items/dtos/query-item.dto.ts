import { IsString } from 'class-validator';

export class QueryItemDto {
  @IsString()
  name: string;

  @IsString()
  location: string;

  @IsString()
  category: string;

  @IsString()
  year: string;
}
