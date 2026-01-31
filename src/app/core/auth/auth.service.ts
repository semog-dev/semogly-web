import { inject, Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map, catchError, shareReplay, tap } from 'rxjs/operators';
import { ApiService } from '../api/api.service';
import { Router } from '@angular/router';

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

  login(email: string, password: string) {
    return this.api
      .post('/api/account/login', { email, password })
      .pipe(tap(() => this.invalidateCache()));
  }

  logout() {
    return this.api.post('/api/account/logout', {}).pipe(
      tap(() => {
        this.invalidateCache();
        this._router.navigate(['/auth/login']);
      }),
    );
  }
}
