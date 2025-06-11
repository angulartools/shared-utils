import { TranslationService } from '@angulartoolsdr/translation';
import { DatePipe } from '@angular/common';
import { PipeTransform, Pipe } from '@angular/core';

@Pipe({
    name: 'dateFormat'
})
  export class DateFormatPipe implements PipeTransform {
    constructor(private translateService: TranslationService) {
    }

    transform(value: any, pattern: string = 'mediumDate'): any {
      const datePipe: DatePipe = new DatePipe(this.translateService.currentLang);
       return datePipe.transform(value, pattern);
    }
  }
