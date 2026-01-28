import { TranslationPipe } from '@angulartoolsdr/translation';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'lib-widget-read-data',
  templateUrl: './widget-read-data.html',
  styleUrls: ['./widget-read-data.scss'],
  imports: [TranslationPipe]
})
export class WidgetReadData {

  @Input() label: string;
  @Input('data')
  set _data(value: string) {
    this.data = value;
  }

  @Input('labelInfo')
  set _labelInfo(value: string) {
    this.labelInfo = value;
  }

  data: string;
  labelInfo: string;

}
