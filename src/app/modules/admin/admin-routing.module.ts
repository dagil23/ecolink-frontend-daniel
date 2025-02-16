import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ManageUsersComponent } from './components/manage-users/manage-users.component';

const routes: Routes = [
  {
    path: '',
    component: ManageUsersComponent
  },
  {
    path: '**',
    redirectTo: ''
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
