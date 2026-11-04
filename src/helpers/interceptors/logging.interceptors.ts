import { CallHandler, ExecutionContext, Injectable, NestInterceptor, RequestTimeoutException } from "@nestjs/common";
import { Observable, of, throwError, TimeoutError } from "rxjs";
import { catchError, tap, timeout } from "rxjs/operators";
import appsettings from "../../configs/appsettings.js";

@Injectable()
export class LoggingInterceptor implements NestInterceptor {

    intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> | Promise<Observable<any>> {
        console.log('Before...');

        const now = Date.now();

        //#region Tests
        this._appObservable.subscribe(d => console.log(d));

        this._obs.subscribe(d => console.log(d));
        // #endregion

        return next
            .handle()
            .pipe(
                timeout(5000),
                tap(() => {
                    const duration = Date.now() - now;
                    console.log(`After... ${duration}ms`)
                    if (duration > appsettings.app.latencyThreshold) {
                        console.warn(`Warning: Request took longer than expected: ${duration}ms`);
                    }
                }),
                catchError((error) => {
                    console.error("Request failed:", error);
                    if (error instanceof TimeoutError) {
                        return throwError(() => new RequestTimeoutException());
                    }
                    return throwError(() => error);
                })
            );
    }

    _appObservable = new Observable((subscriber) => {
        try {
            subscriber.next("My First Observable");
            subscriber.next("Testing Observable");
            subscriber.complete();
        } catch (e) {
            subscriber.error(e);
        }
    })

    _obs = of(1, 2, 3, 4, 5);

}