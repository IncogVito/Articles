import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { ProcessMonitoringModule } from './process-monitoring/process-monitoring.module';
import { ProcessMonitoringRoutingModule } from './process-monitoring/process-monitoring-routing.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    RouterModule,
    BrowserModule,
    ProcessMonitoringModule,
    ProcessMonitoringRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
