import {ApiOkResponse, ApiTags} from "@nestjs/swagger";
import type {Request, Response} from "express";
import { Controller, Get, Req, Res, Param,Post, Body } from '@nestjs/common';
import { CreateCatDto } from "./models/CreateCatDto.js";


@ApiTags("cats")
@Controller('cats')
export class CatsController {

cats: CreateCatDto[] = [
  {
    name: "Whiskers",
    age: 3,
    breed: "Persian",
  },
  {
    name: "Luna",
    age: 2,
    breed: "Siamese",
  },
  {
    name: "Simba",
    age: 5,
    breed: "Maine Coon",
  },
  {
    name: "Milo",
    age: 1,
    breed: "Bengal",
  },
  {
    name: "Bella",
    age: 4,
    breed: "British Shorthair",
  },
];

    @Get()
    findAll(): object {
        return this.cats;
    }

    @Get("me/:name")
    @ApiOkResponse({
        description: 'Cat retrieved successfully',
        type: CreateCatDto
    })
    async findMeCats(@Req() req: Request
        ,@Res() res: Response<CreateCatDto | undefined>
        ,@Param('name') id?: string
    ) {
            let data:CreateCatDto | undefined;
            
            if(id) {
                data = this.cats.find(m => m.name.toLowerCase() === id.toLowerCase());
            }
            return res.status(200).json(data);
    }
    
    @Post()
     async AddCat(@Body()  cat: CreateCatDto
        ,@Res() res: Response) : Promise<object> {
        if(cat && cat.name){
          this.cats.push(cat);
        }
        return res.status(200).json(this.cats);
    }

}
//npm install --save @nestjs/swagger swagger-ui-express