import { Pipe, PipeTransform, inject } from '@angular/core';
import { DomSanitizer, SafeHtml, SafeStyle, SafeScript, SafeUrl, SafeResourceUrl } from '@angular/platform-browser';

type SafeType = | 'html' | 'style' | 'script' | 'url' | 'resourceUrl';

@Pipe({
  name: 'safe'
})
export class SafePipe implements PipeTransform {

  private readonly sanitizer = inject(DomSanitizer);

  transform(value: string | null | undefined, type: SafeType):
    SafeHtml | SafeStyle | SafeScript | SafeUrl | SafeResourceUrl {

    if (!value) {
      return '';
    }

    switch (type) {

      case 'html':
        return this.sanitizer.bypassSecurityTrustHtml(value);

      case 'style':
        return this.sanitizer.bypassSecurityTrustStyle(value);

      case 'script':
        return this.sanitizer.bypassSecurityTrustScript(value);

      case 'url':
        return this.sanitizer.bypassSecurityTrustUrl(value);

      case 'resourceUrl':
        return this.sanitizer.bypassSecurityTrustResourceUrl(value);

      default:
        throw new Error(
          `Tipo inválido para SafePipe: ${type}`
        );
    }
  }

}
