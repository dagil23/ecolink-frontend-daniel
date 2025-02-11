import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BlogRoutingModule } from './blog-routing.module';
import { BlogCardComponent } from './components/blog-card/blog-card.component';
import { BlogFiltersComponent } from './components/blog-filters/blog-filters.component';
import { BlogListComponent } from './pages/blog-list/blog-list.component';
import { BlogDetailComponent } from './pages/blog-detail/blog-detail.component';
import { SharedModule } from '../../shared/shared.module';
import { BlogCommentComponent } from './components/blog-comment/blog-comment.component';
import { BlogAddCommentComponent } from './components/blog-add-comment/blog-add-comment.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    BlogCardComponent,
    BlogFiltersComponent,
    BlogListComponent,
    BlogDetailComponent,
    BlogCommentComponent,
    BlogAddCommentComponent,
  ],
  imports: [
    CommonModule,
    BlogRoutingModule,
    SharedModule,
    FormsModule
  ]
})
export class BlogModule { }
