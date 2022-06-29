import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthService } from './auth.service';
import { PreferencesService } from './preferences.service';
import { TokenService } from './token.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService, private preferencesService: PreferencesService) {}

  public intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const token = TokenService.Token;
    if (token) {
      let headers = request.headers;
      const preferences = this.preferencesService.preferencesCache;
      if (preferences) {
        const userLocale = preferences.locale;
        headers = headers.set('user-locale', userLocale);
      }

      headers = headers.set('Authorization', `Bearer ${token}`);
      request = request.clone({ headers });
    }

    return next.handle(request).pipe(
      catchError((err) => {
        if (err instanceof HttpErrorResponse && err.status === 401) {
          this.authService.signOut();
        }
        return throwError(err);
      })
    );
  }
}
