import {ApiTags} from "@nestjs/swagger";
import { Controller, Get } from '@nestjs/common';


@ApiTags("cats")
@Controller('cats')
export class CatsController {

    @Get()
    findAll(): object {
        return {
            data: ["cheetah","lion","jaguar"]
        };
    }
}
//npm install --save @nestjs/swagger swagger-ui-express