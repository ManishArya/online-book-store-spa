import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppAccountSectionService {
  private setActiveIndexSubject = new BehaviorSubject<number>(0);
  public setActiveIndex$ = this.setActiveIndexSubject.asObservable();

  constructor() {}

  public setActiveIndex(index: number): void {
    this.setActiveIndexSubject.next(index);
  }
}
