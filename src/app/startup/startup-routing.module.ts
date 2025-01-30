import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StartupViewComponent } from './components/startup-view/startup-view.component';
import { StartupDetailComponent } from './components/startup-detail/startup-detail.component';

const routes: Routes = [
  {
    path: '',
    component: StartupViewComponent
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
export class StartupRoutingModule { }
