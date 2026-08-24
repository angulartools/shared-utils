import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'lib-skeleton',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: 'skeleton.html',
  styleUrls: ['./skeleton.scss'],
})
export class Skeleton {

  appearance = input<'line' | 'circle' | 'square'>('line');

  width = input('100%');
  height = input('16px');
  marginTop = input('0');

}
