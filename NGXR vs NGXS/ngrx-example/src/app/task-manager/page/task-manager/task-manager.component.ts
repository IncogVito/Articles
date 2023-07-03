import {Component, OnInit} from '@angular/core';
import {Store} from "@ngrx/store";
import {AppState} from "../../store/app-state.model";
import {createTask, deleteTask, loadInitialTasks, updateTask} from "../../store/task/task.actions";
import {EMPTY, Observable} from "rxjs";
import {TasksState} from "../../store/task/task.state";
import {selectTasksState} from "../../store/task/task.selectors";
import {TaskModel} from "../../model/task.model";
import {performFullTest} from "../../service/test";

@Component({
  selector: 'app-task-manager',
  templateUrl: './task-manager.component.html',
  styleUrls: ['./task-manager.component.css']
})
export class TaskManagerComponent implements OnInit {
  newTaskContent: string = ''

  public tasksState$: Observable<TasksState> = EMPTY;

  constructor(
    private readonly store: Store<AppState>,) {
  }

  ngOnInit(): void {
    this.store.dispatch(loadInitialTasks());
    this.tasksState$ = this.store.select(selectTasksState);
  }

  addTask() {
    if (this.newTaskContent) {
      this.store.dispatch(createTask({content: this.newTaskContent}));
      this.newTaskContent = '';
    }
  }

  resetTask($event: TaskModel) {
    this.store.dispatch(updateTask({id: $event.id, resolved: false}))
  }

  resolveTask($event: TaskModel) {
    this.store.dispatch(updateTask({id: $event.id, resolved: true}))
  }

  deleteTask($event: TaskModel) {
    this.store.dispatch(deleteTask({id: $event.id}))
  }
}
