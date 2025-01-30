import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StartupViewComponent } from './components/startup-view/startup-view.component';

const routes: Routes = [
  {
    path: '',
    component: StartupViewComponent
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
