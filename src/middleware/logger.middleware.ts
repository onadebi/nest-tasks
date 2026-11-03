import { NestMiddleware, Injectable } from "@nestjs/common";
import { Request, Response, NextFunction } from "express";

@Injectable()
export class LoggerMiddleware implements NestMiddleware {

    use(req: Request, res: Response, next: NextFunction) {
        console.info(`🌐:[${req.method}] ${req.ip} =>  ${req.url} | ${req.path}`);
        next();
    }

}