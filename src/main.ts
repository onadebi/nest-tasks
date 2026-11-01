import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module.js';
import appsettings from './configs/appsettings.js';
import {SwaggerActivate} from "./helpers/index.js"

const PORT = appsettings.app.PORT;


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  console.log("🌐 URL at ==> "+"http://localhost:"+PORT);

  SwaggerActivate(app, 'api');
  await app.listen(PORT)
}
await bootstrap();
