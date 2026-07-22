import { HttpInterceptorFn } from '@angular/common/http';

/**
 * Clones every outgoing request and attaches a mock bearer token.
 * Interceptors run in the order they're registered on the way out
 * (request), and in reverse order on the way back (response) — so if
 * you register [auth, errorHandler, loading], a request passes through
 * auth -> errorHandler -> loading -> server, and the response travels
 * loading -> errorHandler -> auth back to the caller.
 */
export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authReq = req.clone({
    setHeaders: { Authorization: 'Bearer mocktoken-12345' },
  });
  return next(authReq);
};
