import { Component, inject, OnInit } from '@angular/core';
import { BasePage } from '../../../../core/base-page/base-page';
import { AuthService } from '../../../../core/auth/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ErrorResponse } from '../../../../core/responses/error-response.type';

@Component({
  selector: 'app-account-verification-page',
  templateUrl: './account-verification.page.html',
  standalone: false,
  styleUrls: ['./account-verification.page.scss'],
})
export class AccountVerificationPage extends BasePage implements OnInit {
  private readonly _activatedRoute = inject(ActivatedRoute);
  private readonly _authService = inject(AuthService);
  form: FormGroup;

  constructor(private fb: FormBuilder) {
    super();
    this.form = this.fb.group({
      verificationCode: ['', [Validators.required]],
    });
  }

  publicid: string = '';

  ngOnInit(): void {
    this.publicid = this._activatedRoute.snapshot.paramMap.get('publicid') ?? '';
    this.form.patchValue(this._activatedRoute.snapshot.queryParams);
    if (this.publicid && this.form.valid) this.submit();
  }

  submit() {
    if (this.form.invalid) return;
    const { verificationCode } = this.form.value;
    this._authService.accountVerification(this.publicid, verificationCode).subscribe({
      next: () => this.sendSuccess('Account verified as successful'),
      error: (err: ErrorResponse) => this.sendError(err.message),
    });
  }
}
