import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StartupProductsComponent } from './pages/startup-products/startup-products.component';
import { StartupProductFormComponent } from './pages/startup-product-form/startup-product-form.component';

const routes: Routes = [
  {
    path: '',
    component: StartupProductsComponent
  },
  {
    path: 'add-product',
    component: StartupProductFormComponent
  },
  {
    path: 'edit-product/:id',
    component: StartupProductFormComponent
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
export class StartupDashboardRoutingModule { }
