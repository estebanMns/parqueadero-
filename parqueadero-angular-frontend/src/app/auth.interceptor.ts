import { HttpInterceptorFn } from '@angular/common/http';

/**
 * SRP: authInterceptor tiene UNA sola responsabilidad:
 * adjuntar el JWT Bearer token en cada petición HTTP autenticada.
 */
export const authInterceptor: HttpInterceptorFn = (req, next) => {
  // Excluir petición de login (no requiere token)
  if (req.url.includes('/auth/login')) {
    return next(req);
  }

  const token = localStorage.getItem('token');
  if (!token) {
    return next(req);
  }

  const authReq = req.clone({
    setHeaders: { Authorization: `Bearer ${token}` }
  });

  return next(authReq);
};
