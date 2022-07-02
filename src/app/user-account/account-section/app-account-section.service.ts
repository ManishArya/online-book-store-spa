import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppAccountSectionService {
  private activeIndexChangesSubject = new BehaviorSubject<number>(0);
  public activeIndexChanges$ = this.activeIndexChangesSubject.asObservable();

  constructor() {}

  public activeIndexChanges(index: number): void {
    this.activeIndexChangesSubject.next(index);
  }
}
