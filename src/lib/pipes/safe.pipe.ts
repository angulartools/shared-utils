import { Pipe, PipeTransform } from '@angular/core';
import { SafeHtml, SafeStyle, SafeScript, SafeUrl, SafeResourceUrl, DomSanitizer } from '@angular/platform-browser';

@Pipe({
    name: 'safe'
})
export class SafePipe implements PipeTransform {

  constructor(protected _sanitizer: DomSanitizer) {
  }

  public transform(value: string, type: string): SafeHtml | SafeStyle | SafeScript | SafeUrl | SafeResourceUrl {
    switch (type) {
      case 'html':
        return this._sanitizer.bypassSecurityTrustHtml(value);
      case 'style':
        return this._sanitizer.bypassSecurityTrustStyle(value);
      case 'script':
        return this._sanitizer.bypassSecurityTrustScript(value);
      case 'url':
        return this._sanitizer.bypassSecurityTrustUrl(value);
      case 'resourceUrl':
        return this._sanitizer.bypassSecurityTrustResourceUrl(value);
      default:
        throw new Error(`Unable to bypass security for invalid type: ${type}`);
    }
  }
}
