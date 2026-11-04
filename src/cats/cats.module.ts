import { Module } from '@nestjs/common';
import { CatsService } from './cats.service.js';
import { CatsController } from './cats.controller.js';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from '../helpers/guards/roles.guard.js';


@Module({
    controllers: [CatsController],
    providers: [
        CatsService
        , { provide: APP_GUARD, useClass: RolesGuard }
    ],
    exports: [CatsService]
})
export class CatsModule { }