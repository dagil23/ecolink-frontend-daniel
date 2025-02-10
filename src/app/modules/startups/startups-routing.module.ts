import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StartupsListComponent } from './pages/startups-list/startups-list.component';
import { StartupDetailComponent } from './pages/startup-detail/startup-detail.component';

const routes: Routes = [
  {
    path: '',
    component: StartupsListComponent
  },
  {
    path: ':id',
    component: StartupDetailComponent
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
export class StartupsRoutingModule { }
