import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { finalize } from 'rxjs/operators';
import { LoadingService } from '../services/loading.service';

/**
 * Flips the shared spinner on before the request goes out and off once
 * it settles. finalize runs whether the Observable completes
 * successfully or errors out — the RxJS equivalent of a finally block —
 * which is exactly what a loading indicator needs: it must disappear
 * either way, not just on the happy path.
 */
export const loadingInterceptor: HttpInterceptorFn = (req, next) => {
  const loadingService = inject(LoadingService);
  loadingService.show();

  return next(req).pipe(finalize(() => loadingService.hide()));
};
