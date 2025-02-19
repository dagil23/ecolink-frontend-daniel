import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StartupProductsComponent } from './pages/startup-products/startup-products.component';
import { StartupPostsComponent } from './components/startup-posts/startup-posts.component';
import { StartupFormPostComponent } from './components/startup-form-post/startup-form-post.component';
import { ProductListComponent } from './pages/startup-products/components/product-list/product-list.component';
import { ProductFormComponent } from './pages/startup-products/components/product-form/product-form.component';
import {ProductSalesComponent} from './pages/startup-products/components/product-sales/product-sales.component';
import {StartupProposalsComponent} from './pages/startup-proposals/startup-proposals.component';
import {ProposalListComponent} from './pages/startup-proposals/proposal-list/proposal-list.component';
import {ProposalFormComponent} from './pages/startup-proposals/proposal-form/proposal-form.component';

const routes: Routes = [
  {
    path: '',
    component: StartupProductsComponent,
    children: [
      { path: '', component: ProductListComponent },
      { path: 'products', component: ProductListComponent },
      { path: 'products/new', component: ProductFormComponent },
      { path: 'products/edit/:id', component: ProductFormComponent },
      { path: 'sales', component: ProductSalesComponent }
    ]
  },
  {
    path: 'proposals',
    component: StartupProposalsComponent,
    children: [
      { path: '', component: ProposalListComponent },
      { path: 'new', component: ProposalFormComponent },
      { path: 'edit/:id', component: ProposalFormComponent }
    ]
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
