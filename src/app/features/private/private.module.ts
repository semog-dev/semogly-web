import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { FormsModule } from '@angular/forms';
import { PrivateRoutingModule } from './private-routing.module';

@NgModule({
  declarations: [],
  imports: [CommonModule, FormsModule, RouterModule, PrivateRoutingModule],
})
export class PrivateModule {}
