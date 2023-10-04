import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProcessMonitoringPageComponent } from './pages/process-monitoring-page/process-monitoring-page.component';
import { SingleProcessComponent } from './components/single-process/single-process.component';
import { ProcessMonitoringRoutingModule } from './process-monitoring-routing.module';


@NgModule({
  declarations: [
    ProcessMonitoringPageComponent,
    SingleProcessComponent
  ],
  imports: [
    CommonModule,
    ProcessMonitoringRoutingModule
  ]
})
export class ProcessMonitoringModule { }
