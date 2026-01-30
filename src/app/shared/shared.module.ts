import { CommonModule } from '@angular/common';
import { NgModule, Optional, SkipSelf } from '@angular/core';
import { Toast } from './components/toast/toast';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [Toast],
  imports: [CommonModule, MatIconModule, MatButtonModule],
  exports: [Toast],
})
export class SharedModule {
  constructor(@Optional() @SkipSelf() parent: SharedModule) {
    if (parent) {
      throw new Error('SharedModule já foi importado');
    }
  }
}
