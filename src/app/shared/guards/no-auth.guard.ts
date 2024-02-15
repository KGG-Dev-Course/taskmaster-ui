import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const noAuthGuard: CanActivateFn = (route, state) => {
  const router: Router = inject(Router);
  const authService: AuthService = inject(AuthService);

  if (authService.isLogged()) {
    if (authService.isAdmin()) {
      router.navigate(['/admin']).then();
      return false;
    } else {
      router.navigate(['/home']).then();
      return false;
    }
  } else {
    return true;
  }
};
