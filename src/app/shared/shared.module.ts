import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { Toast } from './components/toast/toast';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { InputComponent } from './components/input/input';

@NgModule({
  declarations: [Toast, InputComponent],
  imports: [CommonModule, MatIconModule, MatButtonModule],
  exports: [Toast, InputComponent],
})
export class SharedModule {}
