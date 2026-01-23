import { Injectable } from '@angular/core';
import { ApiService } from '../../../core/services/api.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private api: ApiService) {}

  login(email: string, password: string) {
    return this.api.post<{ token: string }>('/api/account/login', { email, password });
  }
}
