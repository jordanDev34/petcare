import { HttpInterceptorFn } from '@angular/common/http';

const TOKEN_KEY = 'petcare_jwt';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  // J'intercepte les appels backend
  if (!req.url.startsWith('/api')) {
    return next(req);
  }

  const token = localStorage.getItem(TOKEN_KEY);

  if (!token) {
    return next(req);
  }

  const authReq = req.clone({
    setHeaders: {
      Authorization: `Bearer ${token}`,
    },
  });

  return next(authReq);
};
