import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BasePage } from '../../../../core/base-page/base-page';
import { AuthService } from '../../../../core/auth/auth.service';
import { ErrorResponse } from '../../../../core/responses/error-response.type';

@Component({
  selector: 'app-signup-page',
  templateUrl: './signup.page.html',
  standalone: false,
  styleUrls: ['./signup.page.scss'],
})
export class SignUpPage extends BasePage {
  private readonly _authService = inject(AuthService);
  form: FormGroup;

  constructor(private fb: FormBuilder) {
    super();
    this.form = this.fb.group({
      name: ['', [Validators.required]],
      lastname: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  submit() {
    if (this.form.invalid) return;

    const { name, lastname, email, password } = this.form.value;
    this._authService.createAccount(name, lastname, email, password).subscribe({
      next: () => {
        this.sendSuccess('Account created!');
      },
      error: (err: ErrorResponse) => {
        this.sendError(err.message);
      },
    });
  }
}
