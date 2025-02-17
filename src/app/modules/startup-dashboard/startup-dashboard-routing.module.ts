import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StartupProductsComponent } from './pages/startup-products/startup-products.component';
import { StartupProductFormComponent } from './pages/startup-product-form/startup-product-form.component';
import { StartupPostsComponent } from './components/startup-posts/startup-posts.component';
import { StartupFormPostComponent } from './components/startup-form-post/startup-form-post.component';

const routes: Routes = [
  {
    path: '',
    component: StartupProductsComponent
  },
  {
    path: 'products',
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
    path: 'add-post',
    component: StartupFormPostComponent
  },
  {
    path: 'posts',
    component: StartupPostsComponent
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
