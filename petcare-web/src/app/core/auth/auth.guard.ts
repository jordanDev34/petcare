import { inject } from '@angular/core';
import { CanMatchFn, Router, UrlSegment } from '@angular/router';
import { AuthService } from './auth.service';

export const authGuard: CanMatchFn = (route, segments: UrlSegment[]) => {
  const auth = inject(AuthService);
  const router = inject(Router);

  // Si user déjà connecté -> OK
  if (auth.isAuthenticated()) {
    return true;
  }

  // Ici je reconstruis l'URL demandée pour éventuellement la réutiliser plus tard (à voir + tard)
  const redirectTo = '/' + segments.map((s) => s.path).join('/');

  // Redirection vers /login
  return router.createUrlTree(['/login'], {
    queryParams: { redirectTo },
  });
};
