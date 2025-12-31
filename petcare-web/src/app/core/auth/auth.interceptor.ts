import { HttpInterceptorFn } from '@angular/common/http';

const STORAGE_KEY = 'petcare_jwt';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  // Je lis le token directement depuis le localStorage
  const token = localStorage.getItem(STORAGE_KEY);

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
