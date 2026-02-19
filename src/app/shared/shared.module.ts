import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { Toast } from './components/toast/toast';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { InputComponent } from './components/input/input';
import { OtpInput } from './components/otp-input/otp-input';
import { MatFormField } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [Toast, InputComponent, OtpInput],
  imports: [CommonModule, MatIconModule, MatButtonModule, MatFormField, FormsModule],
  exports: [Toast, InputComponent, OtpInput],
})
export class SharedModule {}
