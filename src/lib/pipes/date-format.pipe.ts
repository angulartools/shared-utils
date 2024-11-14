import { TranslateService } from '@ngx-translate/core';
import { DatePipe } from '@angular/common';
import { PipeTransform, Pipe } from '@angular/core';

@Pipe({
    name: 'dateFormat',
    standalone: true
})
  export class DateFormatPipe implements PipeTransform {
    constructor(private translateService: TranslateService) {
    }

    transform(value: any, pattern: string = 'mediumDate'): any {
      const datePipe: DatePipe = new DatePipe(this.translateService.currentLang);
       return datePipe.transform(value, pattern);
    }
  }
