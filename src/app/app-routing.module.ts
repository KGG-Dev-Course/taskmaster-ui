import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { noAuthGuard } from './shared/guards/no-auth.guard';
import { ForgotPasswordPageComponent } from './shared/pages/forgot-password-page/forgot-password-page.component';
import { LoginPageComponent } from './shared/pages/login-page/login-page.component';
import { RegisterPageComponent } from './shared/pages/register-page/register-page.component';

const routes: Routes = [
  { path: '', redirectTo: 'auth/login', pathMatch: 'full' },
  {
    path: 'auth',
    canActivate: [noAuthGuard],
    children: [
      { path: 'login', component: LoginPageComponent },
      { path: 'register', component: RegisterPageComponent },
      { path: 'forgot-password', component: ForgotPasswordPageComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
