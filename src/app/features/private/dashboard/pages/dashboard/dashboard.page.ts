import { Component, inject } from '@angular/core';
import { BasePage } from '../../../../../core/base-page/base-page';
import { AuthService } from '../../../../auth/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard.page',
  standalone: false,
  templateUrl: './dashboard.page.html',
  styleUrl: './dashboard.page.css',
})
export class DashboardPage extends BasePage {
  private readonly _authService = inject(AuthService);
  private readonly _router = inject(Router);

  logout() {
    this._authService.logout().subscribe({
      next: () => {
        this.sendSuccess('Usuário deslogado com sucesso.');
        window.location.reload();
      },
      error: (err) => {
        this.sendError(err.error.message);
      },
    });
  }
}
