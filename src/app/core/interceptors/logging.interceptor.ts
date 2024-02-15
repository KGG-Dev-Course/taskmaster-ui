import { HttpInterceptorFn, HttpResponse } from '@angular/common/http';
import { tap } from 'rxjs';

export const loggingInterceptor: HttpInterceptorFn = (req, next) => {
  let isSuccess = '';

  return next(req).pipe(
    tap({
      next: event => {
        if (event instanceof HttpResponse) {
          isSuccess = 'success';
        }
      },
      error: () => isSuccess = 'fail',
      finalize: () => console.log('Request ', isSuccess)
    })
  );
};
