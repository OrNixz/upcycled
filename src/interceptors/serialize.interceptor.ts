import { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common';
import { Observable, map } from 'rxjs';

export class SerializeInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    // Run something before a request is handled by the request handler
    console.log('I am running before the handler', context.getClass());
    return next.handle().pipe(
      // Run something after the request is handled by the request handler
      map((data: any) => {
        console.log('I am running after the handler', data);
      }),
    );
  }
}
