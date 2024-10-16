import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RefreshTeamsService {
  // BehaviorSubject holds a value, subject does not
  // A Subject acts as both an observable and observer, which allows us to emit and listen to events
  private refreshSubject = new Subject<void>();

  // Observable for components to subscribe to
  refreshObservable$ = this.refreshSubject.asObservable();
  triggerRefresh() {
    this.refreshSubject.next();
  }
  constructor() {}
}
