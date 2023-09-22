import { Component, NgZone, OnInit } from '@angular/core';
import { SingleProcessModel } from '../../model/single-process.model';
import { EMPTY, Observable, Subject, Subscription, map, take, takeUntil, tap } from 'rxjs';
import { EventModel } from '../../model/event.model';

@Component({
  selector: 'app-process-monitoring-page',
  templateUrl: './process-monitoring-page.component.html',
  styleUrls: ['./process-monitoring-page.component.scss'],
})
export class ProcessMonitoringPageComponent implements OnInit {
  
  private currentEventSource: EventSource | undefined;
  private messageSubject: Subject<any> = new Subject<any>();
  private stoppedSubscription$: Subject<void> = new Subject();
  public processes: SingleProcessModel[] = [];
  public started: boolean = false;

  constructor(private zone: NgZone) {
    
  }

  getMessageObservable(): Observable<any> {
    return this.messageSubject.asObservable();
  }
  

  ngOnInit(): void {
   this.stoppedSubscription$.pipe(take(5)).subscribe(val => console.log("Dostałem"));
  }

  public stopMonitoring() {
    this.started = false;
    if (this.currentEventSource && this.currentEventSource.readyState == EventSource.OPEN) {
      this.stoppedSubscription$.next();
      this.currentEventSource.close();
    }
  }

  public startStopMonitoring() {
    if (this.started) {
      this.stopMonitoring();
    } else {
      this.startMonitoring();
    }
  }


public startMonitoring() {
  this.started =true;
  this.prepareEventSource();
  

    this.getMessageObservable()
    .pipe(takeUntil(this.stoppedSubscription$))
    .subscribe((val: EventModel) => {
      console.log('wrzucam');
  
      this.zone.run(() => 
      this.processes.push({
        date: new Date(),
        description: val.message,
        status: val.processStatus
      }));
      console.log(val);
      // this.processes = [val];
     });
}

private prepareEventSource() {
  if (this.currentEventSource && this.currentEventSource.readyState == EventSource.OPEN) {
    this.stoppedSubscription$.next();
    this.currentEventSource.close();
  }

  const eventSource = new EventSource('http://localhost:8080/create/' + Math.floor(Math.random() * 2000000));

    eventSource.onmessage = (event) => {
      console.log("ON_MESSAGE");
      const data = JSON.parse(event.data);
      this.messageSubject.next(data);

    };

    eventSource.onerror = (error) => {
      console.error('Błąd SSE:', error);
      eventSource.close();
      this.stoppedSubscription$.next();
    };

    this.currentEventSource = eventSource;
}

}
