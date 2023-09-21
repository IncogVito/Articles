import { Component, NgZone, OnInit } from '@angular/core';
import { SingleProcessModel } from '../../model/single-process.model';
import { EMPTY, Observable, Subject, map, take, tap } from 'rxjs';
import { EventModel } from '../../model/event.model';

@Component({
  selector: 'app-process-monitoring-page',
  templateUrl: './process-monitoring-page.component.html',
  styleUrls: ['./process-monitoring-page.component.scss'],
})
export class ProcessMonitoringPageComponent implements OnInit {
  
  private eventSource: EventSource;
  private messageSubject: Subject<any> = new Subject<any>();
  public processes: SingleProcessModel[] = [];

  constructor(private zone: NgZone) {
    this.eventSource = new EventSource('http://localhost:8080/create/' + Math.floor(Math.random() * 2000000));

    this.eventSource.onmessage = (event) => {
      const data = JSON.parse(event.data);
      this.messageSubject.next(data);
    };

    this.eventSource.onerror = (error) => {
      console.error('Błąd SSE:', error);
    };
  }

  getMessageObservable(): Observable<any> {
    return this.messageSubject.asObservable();
  }
  

  ngOnInit(): void {
   this.getMessageObservable().pipe(take(45)).subscribe((val: EventModel) => {
    console.log('wrzucam');

    this.zone.run(() => 
    this.processes.push({
      date: new Date(),
      description: val.message,
      status: val.processStatus
    }));
    console.log(this.processes);
    // this.processes = [val];
   });
  }




//   createEventSource(): Observable<any> {
//     const eventSource = new EventSource('http://localhost:8080/create/1');

//     return new Observable(observer => {
//         eventSource.onmessage = event => this.populate(event, observer);
//     });
//  }
//   populate(event: MessageEvent<any>, observer: any): any {
//     const ss = JSON.parse(event.data);
//     console.log('dostałem', ss);
//     observer.next(ss);

//     // console.log(this.processes);
  
// }

public startMonitoring() {
  console.log(this.processes);
}

}
