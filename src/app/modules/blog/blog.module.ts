import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BlogRoutingModule } from './blog-routing.module';
import { BlogCardComponent } from './components/blog-card/blog-card.component';
import { BlogFiltersComponent } from './components/blog-filters/blog-filters.component';
import { BlogListComponent } from './pages/blog-list/blog-list.component';
import { BlogDetailComponent } from './pages/blog-detail/blog-detail.component';
import { SharedModule } from '../../shared/shared.module';


@NgModule({
  declarations: [
    BlogCardComponent,
    BlogFiltersComponent,
    BlogListComponent,
    BlogDetailComponent,
  ],
  imports: [
    CommonModule,
    BlogRoutingModule,
    SharedModule
  ]
})
export class BlogModule { }
