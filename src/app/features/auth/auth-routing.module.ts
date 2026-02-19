import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginPage } from './pages/login/login.page';
import { SignUpPage } from './pages/signup/signup.page';
import { AccountVerificationPage } from './pages/account-verification/account-verification.page';

const routes: Routes = [
  {
    path: 'sign-up',
    component: SignUpPage,
  },
  {
    path: 'login',
    component: LoginPage,
  },
  {
    path: 'account-verification/:publicid',
    component: AccountVerificationPage,
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {}
