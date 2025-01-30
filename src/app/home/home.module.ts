import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { ProductsComponent } from './components/products/products.component';
import { StartupsComponent } from './components/startups/startups.component';
import { ChallengesComponent } from './components/challenges/challenges.component';
import { MissionsComponent } from './components/missions/missions.component';
import { PostsComponent } from './components/posts/posts.component';
import { HomeComponent } from './components/home/home.component';
import {SharedModule} from '../shared/shared.module';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [
    ProductsComponent,
    StartupsComponent,
    ChallengesComponent,
    MissionsComponent,
    PostsComponent,
    HomeComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    SharedModule,
    HttpClientModule
  ],
  exports: [
    ProductsComponent,
    StartupsComponent,
    ChallengesComponent,
    MissionsComponent,
    PostsComponent,
    HomeComponent
  ]
})
export class HomeModule { }
