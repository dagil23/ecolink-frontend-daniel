import { NgModule } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { ScrollToErrorDirective } from '../core/directives/scroll-to-error.directive';

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    ScrollToErrorDirective,
  ],
  imports: [CommonModule, NgOptimizedImage],
  exports: [
    HeaderComponent,
    FooterComponent,
    ScrollToErrorDirective,
  ],
})
export class SharedModule {}
