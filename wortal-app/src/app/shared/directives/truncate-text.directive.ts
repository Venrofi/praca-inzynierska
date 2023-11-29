import { Directive, ElementRef, AfterViewInit, HostListener } from '@angular/core';

@Directive({
  selector: '[appTruncateText]'
})
export class TruncateTextDirective implements AfterViewInit {

  @HostListener('window:resize', ['$event'])
  onResize(event: Event): void {
    this.checkTruncation();
  }

  originalText: string = '';

  constructor(private el: ElementRef) { }

  ngAfterViewInit(): void {
    this.originalText = this.el.nativeElement.innerText;
    this.checkTruncation();
  }

  private checkTruncation() { //TODO: NEEDS PROPER DEBUGGING!
    const element = this.el.nativeElement;
    const text = element.innerText;

    console.log('checking..');

    // Check if text is truncated and remove truncation
    if (element.offsetWidth >= element.scrollWidth && element.innerText.endsWith('...')) {
      element.innerText = this.originalText;
      return;
    }

    // Check if text overflowed and apply truncation
    if (element.offsetWidth < element.scrollWidth && !element.innerText.endsWith('...')) {
      this.truncateText(element, text);
      return;
    }
  }

  private truncateText(element: HTMLElement, originalText: string): void {
    let truncatedText = originalText;
    while (element.offsetWidth < element.scrollWidth && truncatedText.length > 0) {
      truncatedText = truncatedText.slice(0, -1);
      element.innerText = truncatedText + '...';
    }
  }
}
