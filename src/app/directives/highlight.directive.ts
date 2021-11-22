import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appHighlight]'
})
export class HighlightDirective {

  @HostListener('mouseenter') onMouseEnter(){
    this.element.nativeElement.style.backgroundcolor = 'red'
  }

  @HostListener('mouseleave') onMouseLeave(){
    this.element.nativeElement.style.backgroundcolor = '';
  }

  constructor(
    private element : ElementRef
  ) { }

}
