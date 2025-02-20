import { Directive, HostListener, ElementRef } from '@angular/core';

@Directive({
  selector: 'form' // Se aplica a todos los <form> de la app automáticamente
})
export class ScrollToErrorDirective {
  constructor(private el: ElementRef) {}

  @HostListener('submit', ['$event'])
  onSubmit(event: Event): void {
    setTimeout(() => {
      // Busca el primer campo con error
      const firstErrorElement = this.el.nativeElement.querySelector(
        '.ng-invalid, .is-invalid' // Incluye Bootstrap (.is-invalid)
      );

      if (firstErrorElement) {
        firstErrorElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
        (firstErrorElement as HTMLElement).focus();
      }
    }, 0);
  }
}
