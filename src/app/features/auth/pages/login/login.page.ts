import { Component, inject } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService as AuthServiceCore } from '../../../../core/auth/auth.service';
import { MessageService } from '../../../../core/message/message.service';
import { BasePage } from '../../../../core/base-page/base-page';

@Component({
  selector: 'app-login-page',
  templateUrl: './login.page.html',
  standalone: false,
  styleUrls: ['./login.page.scss'],
})
export class LoginPage extends BasePage {
  private readonly _authApiService = inject(AuthService);
  private readonly _authServiceCore = inject(AuthServiceCore);
  private readonly _route = inject(ActivatedRoute);
  private readonly _router = inject(Router);

  login({ email, password }: { email: string; password: string }) {
    this._authApiService.login(email, password).subscribe({
      next: () => {
        this.loginSuccess();
      },
      error: (err) => {
        this.sendError(err.error.message);
      },
    });
  }

  private loginSuccess() {
    this._authServiceCore.invalidateCache();
    const returnUrl = this._route.snapshot.queryParamMap.get('returnUrl') || '/private';
    this._router.navigateByUrl(returnUrl);
    this.sendSuccess('Usuário logado com sucesso.');
  }
}
