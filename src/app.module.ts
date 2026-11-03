import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { CatsController } from './cats/cats.controller.js';
import { CatsModule } from './cats/cats.module.js';
import { LoggerMiddleware } from './middleware/logger.middleware.js';
import { NextFunction, Request,Response } from 'express';

@Module({
  imports: [CatsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {

  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware,
      (req: Request, res: Response, next: NextFunction) => {
        console.info(`💡:[${req.method}] ${req.ip} =>  ${req.url} | ${req.path}`);
        next();
      })
      .exclude('health', 'health/*wildcard')
      .forRoutes(CatsController, AppController);
  }

}
