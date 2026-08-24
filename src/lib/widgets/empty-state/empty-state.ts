import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { TranslationPipe } from '@angulartoolsdr/translation';

@Component({
  selector: 'lib-empty-state',
  templateUrl: './empty-state.html',
  styleUrls: ['./empty-state.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [TranslationPipe]
})
export class EmptyState {

  readonly icon = input('fa-chart-line');
  readonly message = input('NENHUM_DADO_ESTATISTICA_FILTRO_SELECIONADO');
  readonly height = input(300);

}
