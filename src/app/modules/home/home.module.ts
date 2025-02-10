import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { ChallengesComponent } from './components/challenges/challenges.component';
import { MissionsComponent } from './components/missions/missions.component';
import { ArticlesComponent } from './components/articles/articles.component';
import { ProductsComponent } from './components/products/products.component';
import { StartupsComponent } from './components/startups/startups.component';
import { HomeComponent } from './pages/home/home.component';
import { SharedModule } from '../../shared/shared.module';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [
    ChallengesComponent,
    MissionsComponent,
    ArticlesComponent,
    ProductsComponent,
    StartupsComponent,
    HomeComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    SharedModule,
    HttpClientModule
  ]
})
export class HomeModule { }
