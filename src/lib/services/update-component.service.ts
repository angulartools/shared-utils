import { Service, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs';
import { TemporizadorAtualizacao } from './temporizador-atualizacao';

@Service()
export class UpdateComponentService implements OnDestroy {
  private readonly temporizador = new TemporizadorAtualizacao();

  get intervaloUpdate(): number {
    return this.temporizador.intervaloUpdate;
  }
  set intervaloUpdate(value: number) {
    this.temporizador.intervaloUpdate = value;
  }

  get contadorUpdate(): number {
    return this.temporizador.contadorUpdate;
  }
  set contadorUpdate(value: number) {
    this.temporizador.contadorUpdate = value;
  }

  get vTimerUpdate(): any {
    return this.temporizador.vTimerUpdate;
  }
  set vTimerUpdate(value: any) {
    this.temporizador.vTimerUpdate = value;
  }

  get display(): string {
    return this.temporizador.display;
  }
  set display(value: string) {
    this.temporizador.display = value;
  }

  get stopZero(): boolean {
    return this.temporizador.stopZero;
  }
  set stopZero(value: boolean) {
    this.temporizador.stopZero = value;
  }

  get update$(): Observable<boolean> {
    return this.temporizador.update$;
  }

  ngOnDestroy(): void {
    this.stopIntervalo();
  }

  initTimer(): void {
    this.temporizador.initTimer();
  }

  updateIntervalo(intervalo: number, stopZero: boolean = false): void {
    this.temporizador.updateIntervalo(intervalo, stopZero);
  }

  updateScreen(): void {
    this.temporizador.updateScreen();
  }

  stopIntervalo(): void {
    this.temporizador.stopIntervalo();
  }

  setDisplay(seconds: number): void {
    this.temporizador.setDisplay(seconds);
  }

  timerUpdate(): any {
    return this.temporizador.timerUpdate();
  }
}

export { TemporizadorAtualizacao };
