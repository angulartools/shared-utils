import { TranslationPipe } from '@angulartoolsdr/translation';
import { Component, ChangeDetectionStrategy, input } from '@angular/core';

@Component({
  selector: 'lib-widget-read-data',
  templateUrl: './widget-read-data.html',
  styleUrls: ['./widget-read-data.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [TranslationPipe]
})
export class WidgetReadData {

  label = input<string>();
  data = input<string>(null, { alias: 'data' });
  labelInfo = input<string>(null, { alias: 'labelInfo' });

}

