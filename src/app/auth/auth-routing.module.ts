import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './components/register/register.component';
import {LoginComponent} from './components/login/login.component';
import { AuthGuard } from '../core/guards/auth.guard';
import {VerificationComponent} from './components/verification/verification.component';
import {ForgotPasswordComponent} from './components/forgot-password/forgot-password.component';
import {ResetPasswordComponent} from './components/reset-password/reset-password.component';




const routes: Routes = [
  {
    path: 'register', component: RegisterComponent, canActivate: [AuthGuard]
  },
  {
    path: 'login', component: LoginComponent, canActivate: [AuthGuard]
  },
  {
    path: 'verification', component: VerificationComponent, canActivate: [AuthGuard]
  },
  {
    path: 'forgot-password',component:ForgotPasswordComponent,canActivate:[AuthGuard]
  },
  {
    path: 'reset-password',component:ResetPasswordComponent,canActivate:[AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
