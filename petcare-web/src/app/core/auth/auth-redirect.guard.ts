// src/app/core/auth/auth-redirect.guard.ts
import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './auth.service';

export const authRedirectGuard: CanActivateFn = (route, state) => {
  const auth = inject(AuthService);
  const router = inject(Router);

  if (auth.isAuthenticated()) {
    // Si l’URL a un redirectTo (ex: /login?redirectTo=/pets), on l’utilise
    const target = route.queryParamMap.get('redirectTo') ?? '/pets';

    return router.parseUrl(target);
  }

  // Pas connecté → on laisse accéder à /login ou /register
  return true;
};
