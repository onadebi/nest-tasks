import { NestFactory } from '@nestjs/core';
import {Request, Response, NextFunction} from 'express';
import { AppModule } from './app.module.js';
import appsettings from './configs/appsettings.js';
import {SwaggerActivate,AppHeaders} from "./helpers/index.js"

const PORT = appsettings.app.PORT;

async function bootstrap() {
  const app = await NestFactory.create(AppModule,{
    routeConflictPolicy: { duplicate: 'error', shadow: 'warn' },
  });
  
  console.log("🌐 URL at ==> "+"http://localhost:"+PORT);

  AppHeaders(app, appsettings.app.headers);
  SwaggerActivate(app, 'swagger');
  await app.listen(PORT)
}
await bootstrap();
