import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export function SwaggerActivate(app: INestApplication, url= 'api',isAtive = true){
    const config = new DocumentBuilder()
    .setTitle('API Documentation')
    .setDescription('Application endpoints and schemas')
    .setVersion('1.0')
    .addBearerAuth() // Optional: Adds JWT bearer authorization
    .build();

    const documentFactory = () => SwaggerModule.createDocument(app, config);
    SwaggerModule.setup(url, app, documentFactory);
}