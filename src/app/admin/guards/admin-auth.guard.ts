import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../../shared/services/auth.service';

export const adminAuthGuard: CanActivateFn = (route, state) => {
  const router: Router = inject(Router);
  const authService: AuthService = inject(AuthService);

  if (authService.isLogged() && authService.isAdmin()) {
    return true;
  } else {
    router.navigate(['/auth/login']).then();
    return false;
  }
};
