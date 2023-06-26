import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SingleTaskComponent} from './components/single-task/single-task.component';
import {TaskManagerComponent} from './page/task-manager/task-manager.component';
import {FormsModule} from "@angular/forms";


@NgModule({
  declarations: [
    SingleTaskComponent,
    TaskManagerComponent,
  ],
  imports: [
    CommonModule,
    FormsModule
  ]
})
export class TaskManagerModule {
}
