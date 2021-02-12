import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { AbstractHttpAdapter, HttpAdapterHost } from '@nestjs/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { NestResponse } from '../../core/http/nest-response';

@Injectable()
export class TransformResponseInterceptor implements NestInterceptor {

    private httpAdapter: AbstractHttpAdapter;

    constructor(adapterHost: HttpAdapterHost) {
        this.httpAdapter = adapterHost.httpAdapter;
    }


    intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> | Promise<Observable<any>> {
        return next.handle()
            .pipe(
                map((controllerResponse: NestResponse) => {
                    if (controllerResponse instanceof NestResponse) {
                        const ctx = context.switchToHttp();
                        const res = ctx.getResponse();
                        const { headers, status, body } = controllerResponse;

                        const headersNames = Object.getOwnPropertyNames(headers);
                        headersNames.forEach(headerName => {
                            const headerValue = headers[headerName];
                            this.httpAdapter.setHeader(res, headerName, headerValue)
                        });

                        this.httpAdapter.status(res, status);

                        return body;
                    }

                    return controllerResponse;
                })
            )
    }

}