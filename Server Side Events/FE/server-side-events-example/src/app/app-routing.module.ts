import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProcessMonitoringPageComponent } from './process-monitoring/pages/process-monitoring-page/process-monitoring-page.component';

const routes: Routes = [
    { 
        path: '', 
        redirectTo: 'process-monitoring', 
        pathMatch: 'full'
    },
  { path: 'process-monitoring', component: ProcessMonitoringPageComponent }, // Trasa dla Twojego komponentu
  // Inne trasy
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }