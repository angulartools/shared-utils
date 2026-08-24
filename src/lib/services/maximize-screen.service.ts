import { Service, signal } from '@angular/core';
import { toObservable } from '@angular/core/rxjs-interop';

@Service()
export class MaxmimizeScreenService {

  private readonly maximizeSignal = signal(false);

  readonly maximize = this.maximizeSignal.asReadonly();

  readonly maximize$ = toObservable(this.maximizeSignal);

  updateMaximize(value: boolean): void {
    this.maximizeSignal.set(value);
  }

  toggle(): void {
    this.maximizeSignal.update(v => !v);
  }

}