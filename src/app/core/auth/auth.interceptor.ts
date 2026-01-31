import { inject, Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpErrorResponse,
  HttpClient,
} from '@angular/common/http';
import { Observable, throwError, BehaviorSubject } from 'rxjs';
import { catchError, filter, switchMap, take } from 'rxjs/operators';
import { Router } from '@angular/router';
import { ApiService } from '../api/api.service';
import { AuthService } from './auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  private isRefreshing = false;
  private refreshTokenSubject = new BehaviorSubject<boolean | null>(null);
  private readonly _authService = inject(AuthService);

  constructor(
    private api: ApiService,
    private router: Router,
  ) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const authReq = request.clone();

    return next.handle(authReq).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401 && !request.url.includes('/api/account/refresh')) {
          return this.handle401(authReq, next);
        }

        return throwError(() => error);
      }),
    );
  }

  private handle401(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (!this.isRefreshing) {
      this.isRefreshing = true;
      this.refreshTokenSubject.next(null);

      return this.api.post('/api/account/refresh', {}).pipe(
        switchMap(() => {
          this.isRefreshing = false;
          this.refreshTokenSubject.next(true);

          // refaz a requisição original
          return next.handle(request);
        }),
        catchError((err) => {
          this.isRefreshing = false;
          this._authService.logout();
          return throwError(() => err);
        }),
      );
    }

    // aguarda o refresh em andamento
    return this.refreshTokenSubject.pipe(
      filter((v) => v === true),
      take(1),
      switchMap(() => next.handle(request)),
    );
  }
}
