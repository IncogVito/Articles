import { Component } from '@angular/core';
import { SingleProcessModel } from '../../model/single-process.model';

@Component({
  selector: 'app-process-monitoring-page',
  templateUrl: './process-monitoring-page.component.html',
  styleUrls: ['./process-monitoring-page.component.scss']
})
export class ProcessMonitoringPageComponent {


  public process: SingleProcessModel = {
    status: 'Success',
    description: 'Sent money to bank',
    date: new Date()
  }

}
