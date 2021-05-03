import {Directive, ElementRef, HostListener, Renderer} from '@angular/core';

@Directive({
  selector: '[anmsFocusDirective]'
})
export class FocusDirectiveDirective {
  constructor() {
    console.log('test');
  }

  @HostListener('document:keydown', ['$event']) onKeydownHandler(event: KeyboardEvent) {
    console.log(event);
  }
}
