import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { ManageUsersComponent } from './components/manage-users/manage-users.component';
import { SharedModule } from '../../shared/shared.module';


@NgModule({
  declarations: [
    ManageUsersComponent,
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    SharedModule
  ]
})
export class AdminModule { }
