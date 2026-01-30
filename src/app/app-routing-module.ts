import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { redirectIfAuthenticatedGuard } from './core/auth/redirect-if-authenticated.guard';
import { authGuard } from './core/auth/auth.guard';

const routes: Routes = [
  {
    path: 'auth',
    canActivate: [redirectIfAuthenticatedGuard],
    loadChildren: () => import('./features/auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: 'private',
    canActivate: [authGuard],
    loadChildren: () => import('./features/private/private.module').then((m) => m.PrivateModule),
  },
  {
    path: '',
    redirectTo: 'auth',
    pathMatch: 'full',
  },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
