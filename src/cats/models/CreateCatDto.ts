import { ApiProperty } from '@nestjs/swagger';

export class CreateCatDto {
  @ApiProperty()
  name: string;
  @ApiProperty()
  age: number;
  @ApiProperty({ required: false })
  breed?: string;
}