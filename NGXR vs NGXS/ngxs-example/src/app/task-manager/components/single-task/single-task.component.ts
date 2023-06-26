import {Component, EventEmitter, Input, Output} from '@angular/core';
import {TaskModel} from "../../model/task.model";

@Component({
  selector: 'app-single-task',
  templateUrl: './single-task.component.html',
  styleUrls: ['./single-task.component.css']
})
export class SingleTaskComponent {

  @Output()
  public deleteTask = new EventEmitter<TaskModel>();

  @Output()
  public resolveTask = new EventEmitter<TaskModel>();

  @Output()
  public resetTask = new EventEmitter<TaskModel>();

  @Input()
  task: TaskModel | undefined;

  statusChanged($event: Event) {
    if ($event.target instanceof HTMLInputElement) {
      if ($event.target.checked) {
        this.resolveTask.emit(this.task);
      } else {
        this.resetTask.emit(this.task);
      }
    }
  }
}
