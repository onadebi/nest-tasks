import { CanActivate, ExecutionContext, HttpStatus, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Observable } from "rxjs";
import { Roles } from "../decorators/roles.decorator.js";


@Injectable()
export class RolesGuard implements CanActivate {
    constructor(private reflector: Reflector) { }

    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {

        const handler = context.getHandler();
        const roles = this.reflector.get<string[]>(Roles, handler);
        if (!roles) {
            return true;
        }

        const request = context.switchToHttp().getRequest();
        const { hostname, path, ip, body, headers: { }, method: string, url, user } = request;

        const isAllowed = this.matchRoles(roles, user ? user.roles : []);
        if (!isAllowed) {
            const response = context.switchToHttp().getResponse();
            response.status(HttpStatus.UNAUTHORIZED).json({
                message: 'You are not authorised to access this resource.'
                , statusCode: HttpStatus.UNAUTHORIZED
                , error: 'Forbidden'
            });
        }
        return isAllowed;
    }

    private matchRoles(allowedRoles: string[], userRoles: string[]): boolean {
        return allowedRoles.some(role => userRoles.includes(role));
    }

}