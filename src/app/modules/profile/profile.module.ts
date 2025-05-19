import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfileRoutingModule } from './profile-routing.module';
import { ProfileInfoComponent } from './components/profile-info/profile-info.component';
import { ProfileEditFormComponent } from './components/profile-edit-form/profile-edit-form.component';
import { ClientProfileComponent } from './pages/client-profile/client-profile.component';
import { CompanyProfileComponent } from './pages/company-profile/company-profile.component';
import { StartupProfileComponent } from './pages/startup-profile/startup-profile.component';
import { SharedModule } from '../../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { ProfileEditOdsComponent } from './components/profile-edit-ods/profile-edit-ods.component';
import { SuggestOdsComponent } from './components/suggest-ods/suggest-ods.component';


@NgModule({
  declarations: [
    ProfileInfoComponent,
    ProfileEditFormComponent,
    ClientProfileComponent,
    CompanyProfileComponent,
    StartupProfileComponent,
    ProfileEditOdsComponent,
    SuggestOdsComponent
  ],
  imports: [
    CommonModule,
    ProfileRoutingModule,
    SharedModule,
    ReactiveFormsModule
  ]
})
export class ProfileModule { }
