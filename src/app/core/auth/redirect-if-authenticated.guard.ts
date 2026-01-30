import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './auth.service';
import { map } from 'rxjs/operators';

export const redirectIfAuthenticatedGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  return authService.isAuthenticated().pipe(
    map((isLogged) => {
      if (isLogged) {
        const returnUrl = route.queryParamMap.get('returnUrl') || '/private';

        router.navigateByUrl(returnUrl);
        return false;
      }
      return true;
    }),
  );
};
