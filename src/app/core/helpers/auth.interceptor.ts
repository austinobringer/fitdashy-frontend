import { inject } from '@angular/core';
import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { tap, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { Router } from '@angular/router';

// Serves as a middleware for HTTP requests abd resoibses
export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const router = inject(Router);

  // Allow the response to include cookies
  req = req.clone({
    withCredentials: true
  });

  // Pass the cloned request to the next handler
  return next(req).pipe(
    tap(event => {
    }),
    catchError((error: HttpErrorResponse) => {
      
      const sourceUrl = window.location.href;
      const path = parsePathFromUrl(sourceUrl);

      if (error.status === 401 && !(path && path.includes('/auth'))) {
        console.log('Unauthorized request - redirecting to login...');
        router.navigate(['/auth/login']);
      }

      // Rethrow the error so it can be caught by the subscriber
      return throwError(() => error);
    })
  );
};

// Given a URL, this function extracts the path from it
function parsePathFromUrl(url: string): string | null {
  try {
    const urlObject = new URL(url);
    return urlObject.pathname;
  } catch (error) {
    return null;
  }
}