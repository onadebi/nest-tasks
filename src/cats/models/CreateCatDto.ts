import { ApiProperty } from '@nestjs/swagger';
import { ICat } from '../interfaces/cat.interface.js';
import { IsString, IsInt } from 'class-validator';

export class CreateCatDto implements ICat{
  @ApiProperty({ required: false })
  id?: number;

  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsInt()
  age: number;


  @ApiProperty({ required: false })
  @IsString()
  breed: string;
}


import { z } from 'zod';

export const createCatSchema = z.object({
  name: z.string(),
  age: z.number(),
  breed: z.string(),
});

export type CreateCatDtoSchema = z.infer<typeof createCatSchema>;