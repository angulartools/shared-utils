import { BehaviorSubject, Observable } from 'rxjs';

export class TemporizadorAtualizacao {
  intervaloUpdate: number = 60;
  contadorUpdate: number = 0;
  vTimerUpdate: any = null;

  display: string = '';
  stopZero: boolean = false;

  private update: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  update$: Observable<boolean> = this.update.asObservable();

  initTimer(): void {
    if (this.vTimerUpdate === null) {
      if (this.contadorUpdate === 0) {
        this.contadorUpdate = this.intervaloUpdate;
      }
      this.vTimerUpdate = this.timerUpdate();
    }
  }

  updateIntervalo(intervalo: number, stopZero: boolean = false): void {
    this.intervaloUpdate = intervalo;
    this.contadorUpdate = intervalo;
    this.stopZero = stopZero;
  }

  updateScreen(): void {
    this.update.next(true);
    this.contadorUpdate = this.intervaloUpdate;
    this.update.next(false);
  }

  stopIntervalo(): void {
    if (this.vTimerUpdate !== null) {
      clearInterval(this.vTimerUpdate);
      this.vTimerUpdate = null;
    }
  }

  timerUpdate(): any {
    return setInterval(() => {
      if (this.contadorUpdate !== 0) {
        this.contadorUpdate = --this.contadorUpdate;
      }

      this.setDisplay(this.contadorUpdate);

      if (this.contadorUpdate === 0 && !this.stopZero) {
        this.updateScreen();
      }
    }, 1000);
  }

  setDisplay(seconds: number): void {
    const minute = seconds / 60;
    let textSec: any = '0';

    const prefix = minute < 10 ? '0' : '';
    const textMinuto = Math.floor(minute);
    const resto = seconds - (textMinuto * 60);

    if (resto < 10) {
      textSec = '0' + resto;
    } else {
      textSec = resto;
    }

    this.display = `${prefix}${textMinuto}:${textSec}`;
  }
}

