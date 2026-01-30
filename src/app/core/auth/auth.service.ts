// src/app/core/auth/auth.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError, shareReplay } from 'rxjs/operators';
import { ApiService } from '../api/api.service';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private auth$?: Observable<boolean>;

  constructor(private api: ApiService) {}

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
}
