import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UpdateComponentService implements OnDestroy {

  intervaloUpdate = 60;
  contadorUpdate = 0;
  vTimerUpdate = null;

  display;
  stopZero;

  private update: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
    update$: Observable<boolean> = this.update.asObservable();

  constructor() {
    // this.initTimer();
  }

  ngOnDestroy(): void {
    this.stopIntervalo();
  }

  initTimer() {
    if (this.vTimerUpdate === null) {
      if (this.contadorUpdate === 0) {
        this.contadorUpdate = this.intervaloUpdate;
      }
      //setTimeout(() => {
        this.vTimerUpdate = this.timerUpdate();
      //}, 1000);
    }
  }

  updateIntervalo(intervalo, stopZero = false) {
    this.intervaloUpdate = intervalo;
    this.contadorUpdate = intervalo;
    this.stopZero = stopZero;
  }

  updateScreen() {
    this.update.next(true);
    this.contadorUpdate = this.intervaloUpdate;
    this.update.next(false);
  }

  stopIntervalo() {
    clearInterval(this.vTimerUpdate);
    this.vTimerUpdate = null;
  }

  timerUpdate() {
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

  setDisplay(seconds) {

    let minute = seconds / 60;
    let textSec: any = "0";

    const prefix = minute < 10 ? "0" : "";

    let textMinuto = Math.floor(minute);

    const resto = seconds - (textMinuto * 60);

    if (resto < 10) {
      textSec = "0" + resto;
    } else {
      textSec = resto;
    }

    this.display = `${prefix}${textMinuto}:${textSec}`;
  }

}
