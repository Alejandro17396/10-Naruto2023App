import { Directive, HostBinding, HostListener, Input } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

@Directive({
  selector: '[appFallbackImg]'
})
export class FallBackImgDirective {


  @Input() appFallbackImg!: string;
  @HostBinding('src')
  get sanitizedImageUrl(): SafeUrl {
    return this.sanitizer.bypassSecurityTrustUrl(this.src);
  }
  @Input()
  src!: string;

  constructor(private sanitizer: DomSanitizer) { }

  @HostListener('error')
  onError() {
    this.src = this.appFallbackImg;
  }

}
