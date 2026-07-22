import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';

/**
 * Central place to react to HTTP status codes that affect the whole
 * app rather than a single component: 401 means the mock session is
 * no longer valid, so we send the user back to the home/login route;
 * 500 logs a global notice. In both cases we still re-throw the error
 * with throwError so the originating component's own catchError (see
 * CourseService) also gets a chance to update its local UI state.
 */
export const errorHandlerInterceptor: HttpInterceptorFn = (req, next) => {
  const router = inject(Router);

  return next(req).pipe(
    catchError((err: HttpErrorResponse) => {
      if (err.status === 401) {
        console.warn('Unauthorized — redirecting to home.');
        router.navigate(['/']);
      } else if (err.status === 500) {
        console.error('Server error — showing global notification.');
      }
      return throwError(() => err);
    })
  );
};
