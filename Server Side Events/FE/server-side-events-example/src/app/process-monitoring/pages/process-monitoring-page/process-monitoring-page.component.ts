import { Component, NgZone, OnDestroy, OnInit } from '@angular/core';
import { SingleProcessModel } from '../../model/single-process.model';
import { EMPTY, Observable, Subject, Subscription, map, take, takeUntil, tap } from 'rxjs';
import { EventModel } from '../../model/event.model';
import { ProcessMonitoringService } from '../../services/process-monitoring.service';

@Component({
  selector: 'app-process-monitoring-page',
  templateUrl: './process-monitoring-page.component.html',
  styleUrls: ['./process-monitoring-page.component.scss'],
})
export class ProcessMonitoringPageComponent implements OnInit, OnDestroy {
  
  public processes: SingleProcessModel[] = [];
  public started: boolean = false;

  public currentlySubscribedProcess: Subscription | undefined;

  private ngDestroy$ = new Subject<void>();

  constructor(private zone: NgZone,
     private readonly processMonitoringService: ProcessMonitoringService) {
    
  }


  ngOnDestroy(): void {
    this.ngDestroy$.next();
    this.ngDestroy$.complete();
  }

  ngOnInit(): void {
  }

  public startStopMonitoring() {
    if (this.started) {
      this.stopMonitoring();
    } else {
      this.startMonitoring();
    }
  }

  startMonitoring() {
    this.processes = [];
    this.currentlySubscribedProcess = this.processMonitoringService.startMonitoring()
    .pipe(
      takeUntil(this.ngDestroy$)
      )
      .subscribe(val => {
        this.zone.run(() =>this.processes.push(val));
      })
  }
  
  stopMonitoring() {
    this.processMonitoringService.stopMonitoring();
    if (this.currentlySubscribedProcess) {
      this.currentlySubscribedProcess.unsubscribe();
    }
  }
}
