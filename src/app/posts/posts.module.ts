import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PostsRoutingModule } from './posts-routing.module';
import { PostDetailComponent } from './post-detail/post-detail.component';
import { PostsListComponent } from './posts-list/posts-list.component';
import { SharedModule } from "../shared/shared.module";
import { RelatedPostsComponent } from './related-posts/related-posts.component';


@NgModule({
  declarations: [
    PostDetailComponent,
    PostsListComponent,
    RelatedPostsComponent
  ],
  imports: [
    CommonModule,
    PostsRoutingModule,
    SharedModule
]
})
export class PostsModule { }
