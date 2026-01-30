import { Component, inject } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService as AuthServiceCore } from '../../../../core/auth/auth.service';
import { MessageService } from '../../../../core/message/message.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login.page.html',
  standalone: false,
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  private readonly _authApiService = inject(AuthService);
  private readonly _authServiceCore = inject(AuthServiceCore);
  private readonly _route = inject(ActivatedRoute);
  private readonly _router = inject(Router);
  private readonly _messageService = inject(MessageService);

  login({ email, password }: { email: string; password: string }) {
    this._authApiService.login(email, password).subscribe({
      next: (res) => {
        this._authServiceCore.invalidateCache();
        this.loginSuccess();
        this._messageService.sendMessage('Usuário logado com sucesso.', 'success');
      },
      error: (err) => {
        this._messageService.sendMessage(err.error.message, 'error');
      },
    });
  }

  private loginSuccess() {
    const returnUrl = this._route.snapshot.queryParamMap.get('returnUrl') || '/private';
    this._router.navigateByUrl(returnUrl);
  }
}
