import {Directive, ElementRef, Input, OnInit} from '@angular/core';

@Directive({
  selector: '[autofocus]'
})
export class FocusDirective implements OnInit{
  private focus = true;

  constructor(private el: ElementRef) {
  }

  ngOnInit() {
    if (this.focus) {
      window.setTimeout(() => {
        this.el.nativeElement.focus(); // For SSR (server side rendering) this is not safe. Use: https://github.com/angular/angular/issues/15008#issuecomment-285141070)
      });
    }
  }

  @Input() set autofocus(condition: boolean) {
    this.focus = condition !== false;
  }
}
