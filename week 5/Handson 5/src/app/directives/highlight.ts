import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appHighlight]',
})
export class Highlight {
  // Configurable colour — caller can pass a custom colour, e.g.
  // <app-course-card appHighlight="lightblue">. Defaults to yellow when
  // used as a plain attribute: <app-course-card appHighlight>.
  @Input() appHighlight = 'yellow';

  constructor(private el: ElementRef<HTMLElement>) {}

  // @HostListener binds directly to the host element's events — no manual
  // addEventListener/removeEventListener needed; Angular attaches and
  // tears down the listener automatically along with the directive.
  @HostListener('mouseenter')
  onMouseEnter(): void {
    this.el.nativeElement.style.backgroundColor = this.appHighlight;
  }

  @HostListener('mouseleave')
  onMouseLeave(): void {
    this.el.nativeElement.style.backgroundColor = '';
  }
}
