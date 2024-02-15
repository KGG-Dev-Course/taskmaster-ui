import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { AuthService } from '../../shared/services/auth.service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const router: Router = inject(Router);
  const authService: AuthService = inject(AuthService);

  const modifiedReq = req.clone({
    headers: req.headers.set('Authorization', `Bearer ${authService.accessToken}`),
  });

  return next(modifiedReq).pipe(
    catchError((err) => {
      console.log(err);
      if (err.status === 401) {
        console.log('authInterceptor 401');
        authService.logout();
        router.navigate(['/auth/signout']);
      }
      return throwError(() => new Error('Unauthorized Exception'));
    })
  );
};
