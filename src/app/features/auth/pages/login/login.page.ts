import { Component, inject } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login.page.html',
  standalone: false,
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  private readonly _authApiService = inject(AuthService);

  email = '';
  password = '';

  login() {
    this._authApiService.login(this.email, this.password).subscribe();
  }
}
