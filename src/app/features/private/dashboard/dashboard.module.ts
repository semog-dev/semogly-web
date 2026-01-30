import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { FormsModule } from '@angular/forms';
import { DashboardPage } from './pages/dashboard/dashboard.page';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { MatAnchor } from '@angular/material/button';

@NgModule({
  declarations: [DashboardPage],
  imports: [CommonModule, FormsModule, RouterModule, DashboardRoutingModule, MatAnchor],
})
export class DashboardModule {}
