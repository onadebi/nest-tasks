import { INestApplication } from "@nestjs/common";
import { NextFunction, Request, Response } from "express";

export function AppHeaders(app: INestApplication, headers: Record<string, string> = {}) {
    app.use((req: Request, res: Response, next: NextFunction) => {
        for (const [key, value] of Object.entries(headers)) {
            res.setHeader(key, value);
        }
        console.info(`😶‍🌫️:[${req.method}] ${req.ip} =>  ${req.url} | ${req.path}`);
        next();
    });

}