import { inject, Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { map, catchError, shareReplay, tap } from 'rxjs/operators';
import { ApiService } from '../api/api.service';
import { Router } from '@angular/router';
import { isErrorResponse } from '../responses/error-response.type';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private auth$?: Observable<boolean>;
  constructor(private api: ApiService) {}

  private readonly _router = inject(Router);

  isAuthenticated(): Observable<boolean> {
    if (!this.auth$) {
      this.auth$ = this.api.get('/api/account/me').pipe(
        map(() => true),
        catchError(() => of(false)),
        shareReplay(1),
      );
    }

    return this.auth$;
  }

  invalidateCache() {
    this.auth$ = undefined;
  }

  createAccount(name: string, lastname: string, email: string, password: string) {
    return this.api.post('/api/account', { firstname: name, lastname, email, password }).pipe(
      catchError((err) => {
        return isErrorResponse(err.error)
          ? throwError(() => err.error)
          : throwError(() => new Error('Erro ao criar account'));
      }),
    );
  }

  login(email: string, password: string) {
    return this.api.post('/api/account/login', { email, password }).pipe(
      tap(() => this.invalidateCache()),
      catchError((err) => {
        return isErrorResponse(err.error)
          ? throwError(() => err.error)
          : throwError(() => new Error('Erro ao fazer login'));
      }),
    );
  }

  logout() {
    return this.api.post('/api/account/logout', {}).pipe(
      tap(() => {
        this.invalidateCache();
        this._router.navigate(['/auth/login']);
      }),
      catchError((err) => {
        return isErrorResponse(err.error)
          ? throwError(() => err.error)
          : throwError(() => new Error('Erro ao fazer logout'));
      }),
    );
  }

  accountVerification(publicId: string, verificationCode: string) {
    return this.api
      .post(`/api/account/${publicId}/verification`, {
        verificationCode,
      })
      .pipe(
        tap(() => {
          this.invalidateCache();
          this._router.navigate(['/auth/login']);
        }),
        catchError((err) => {
          return isErrorResponse(err.error)
            ? throwError(() => err.error)
            : throwError(() => new Error('Erro ao verificar account'));
        }),
      );
  }
}
