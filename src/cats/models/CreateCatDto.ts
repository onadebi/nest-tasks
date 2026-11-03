import { ApiProperty } from '@nestjs/swagger';
import { ICat } from '../interfaces/cat.interface.js';

export class CreateCatDto implements ICat{
  @ApiProperty({ required: false })
  id?: number;
  @ApiProperty()
  name: string;
  @ApiProperty()
  age: number;
  @ApiProperty({ required: false })
  breed: string;
}