import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {SharedModule} from './shared/shared.module';
import { AboutUsModule } from './about-us/about-us.module';
import { HomeModule } from './modules/home/home.module';
import {NgMultiSelectDropDownModule} from 'ng-multiselect-dropdown';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HomeModule,
    SharedModule,
    AboutUsModule,
    NgMultiSelectDropDownModule
],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
