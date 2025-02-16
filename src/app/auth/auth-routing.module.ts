import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './components/register/register.component';
import {LoginComponent} from './components/login/login.component';
import { AuthGuard } from '../core/guards/auth.guard';
import {VerificationComponent} from './components/verification/verification.component';



const routes: Routes = [
  {
    path: 'register', component: RegisterComponent, canActivate: [AuthGuard]
  },
  {
    path: 'login', component: LoginComponent, canActivate: [AuthGuard]
  },
  {
    path: 'verification', component: VerificationComponent, canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
