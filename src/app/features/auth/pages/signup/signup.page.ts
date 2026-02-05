import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BasePage } from '../../../../core/base-page/base-page';

@Component({
  selector: 'app-signup-page',
  templateUrl: './signup.page.html',
  standalone: false,
  styleUrls: ['./signup.page.scss'],
})
export class SignUpPage extends BasePage {
  submit() {
    throw new Error('Method not implemented.');
  }
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
}
