import { Injectable } from '@angular/core';
import { Observable, Subject, takeUntil } from 'rxjs';
import { SingleProcessModel } from '../model/single-process.model';
import { EventModel } from '../model/event.model';

@Injectable({
  providedIn: 'root'
})
export class ProcessMonitoringService {
  
  private messageSubject$: Subject<SingleProcessModel> = new Subject<SingleProcessModel>();
  private stoppedSubscription$: Subject<void> = new Subject();

  private currentEventSource: EventSource | undefined;

  constructor() { }


public startMonitoring(): Observable<SingleProcessModel> {
  this.createNewEventSource(Math.floor(Math.random() * 2000000));
  return this.getMessageObservable();
}


getMessageObservable(): Observable<SingleProcessModel> {
  return this.messageSubject$.pipe(takeUntil(this.stoppedSubscription$));
}

public stopMonitoring() {
  this.stoppedSubscription$.next();
  if (this.currentEventSource && this.currentEventSource.readyState == EventSource.OPEN) {
    this.currentEventSource.close();
  }
}

// Math.floor(Math.random() * 2000000

private createNewEventSource(userId: number) {
  if (this.currentEventSource && this.currentEventSource.readyState == EventSource.OPEN) {
    this.stoppedSubscription$.next();
    this.currentEventSource.close();
  }

  this.currentEventSource = new EventSource(`http://localhost:8080/create/${userId}`);

    this.currentEventSource.onmessage = (event) => {
      console.error('ON message:', event);
      console.log(this.currentEventSource?.readyState);
      const data: EventModel = JSON.parse(event.data) as EventModel;
      this.messageSubject$.next({
        date: new Date(),
        description: data.message,
        status: data.processStatus  
      });
    };

    this.currentEventSource.onerror = (error) => {
      console.error('Błąd SSE:', error);
      console.log(this.currentEventSource?.readyState);

      this.currentEventSource!.close();
      this.stoppedSubscription$.next();

      console.log(this.currentEventSource?.readyState == 2);
    };
}

}
