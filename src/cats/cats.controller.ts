import { ApiOkResponse, ApiTags } from "@nestjs/swagger";
import type { Request, Response } from "express";
import { Controller, Get, Req, Res, Param, Post, Body, Put, Delete, HttpStatus, ParseIntPipe, UsePipes, ValidationPipe } from '@nestjs/common';
import { CreateCatDto, createCatSchema } from "./models/CreateCatDto.js";
import { CatsService } from "./cats.service.js";
import { ZodValidationPipe } from "../helpers/pipes/zodvalidation.pipe.js";
import { Roles } from "../helpers/decorators/roles.decorator.js";


@ApiTags("cats")
@Controller('cats')
export class CatsController {

  constructor(private readonly catService: CatsService) { }


  @Get()
  async findAll(): Promise<CreateCatDto[]> {
    return await this.catService.getAllCats();
  }

  @Get("me/:name")
  @ApiOkResponse({
    description: 'Cat retrieved successfully',
    type: CreateCatDto
  })
  async findMeCats(@Req() req: Request
    , @Res() res: Response<CreateCatDto | undefined>
    , @Param('name') id?: string
  ): Promise<Response<CreateCatDto | undefined>> {
    let data: CreateCatDto | undefined;

    if (id) {
      data = await this.catService.findCat(id);
    }
    return res.status(200).json(data);
  }

  @Post()
  @UsePipes(new ZodValidationPipe(createCatSchema))
  async AddCat(@Body() cat: CreateCatDto
    , @Res() res: Response): Promise<object> {
    if (cat && cat.name) {
      await this.catService.addCat(cat);
    }
    return res.status(200).json(await this.catService.getAllCats());
  }

  @Put(":id")
  async updateCat(@Param("id", ParseIntPipe) id: number, @Body() cat: CreateCatDto, @Res() res: Response): Promise<Response<boolean >> {
    if (cat && cat.id && id === cat.id) {
      const updated = await this.catService.updateCat(cat);
      return res.status(201).json(updated);
    }
    return res.status(400).json(false);
  }

  @Delete(":id")
  @Roles(["admin"])
  async removeCat(
    @Param("id", new ParseIntPipe({errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE, exceptionFactory: (err)=>{console.log(`Error:: {err}`)}})) id: number
    , @Res({passthrough: true}) res: Response): Promise<boolean> {
    let removed = false; 
    if (id && Number.isInteger(id)) {
      removed = await this.catService.removeCat(Number.parseInt(id.toString()));
    }
    res.statusCode = removed ? HttpStatus.OK : HttpStatus.NOT_FOUND;
    res.status(removed ? HttpStatus.OK : HttpStatus.NOT_FOUND);
    res.setHeader('x-removal-Result', removed.toString());
    return removed;
  }


}  
//npm install --save @nestjs/swagger swagger-ui-express