import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MaxmimizeScreenService {

  private maximize: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
    maximize$: Observable<boolean> = this.maximize.asObservable();

  constructor() {
    this.maximize.next(false);
  }

  updateMaximize(value) {
    this.maximize.next(value);
  }

}
