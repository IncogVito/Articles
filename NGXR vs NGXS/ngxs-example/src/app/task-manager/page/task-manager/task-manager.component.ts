import {Component, OnInit} from '@angular/core';
import {AppState} from "../../store/app-state.model";
import {EMPTY, Observable} from "rxjs";
import {TasksState, TasksStateModel} from "../../store/task/task.state";
import {TaskModel} from "../../model/task.model";
import {Store} from "@ngxs/store";
import {TaskActions} from "../../store/task/task.actions";
import LoadInitialTasks = TaskActions.LoadInitialTasks;
import UpdateTask = TaskActions.UpdateTask;
import DeleteTask = TaskActions.DeleteTask;
import CreateTask = TaskActions.CreateTask;

@Component({
  selector: 'app-task-manager',
  templateUrl: './task-manager.component.html',
  styleUrls: ['./task-manager.component.css']
})
export class TaskManagerComponent implements OnInit {
  newTaskContent: string = ''

  public tasksState$: Observable<TasksStateModel> = this.tasksState.tasksState$;


  constructor(private readonly store: Store,
              private readonly tasksState: TasksState) {
  }

  ngOnInit(): void {
    this.store.dispatch(new LoadInitialTasks());
    // this.tasksState$ = this.store.select(selectTasksState);
  }

  addTask() {
    if (this.newTaskContent) {
      this.store.dispatch(new CreateTask({content: this.newTaskContent}));
      this.newTaskContent = '';
    }
  }

  resetTask($event: TaskModel) {
    this.store.dispatch(new UpdateTask({id: $event.id, resolved: false}))
  }

  resolveTask($event: TaskModel) {
    this.store.dispatch(new UpdateTask({id: $event.id, resolved: true}))
  }

  deleteTask($event: TaskModel) {
    this.store.dispatch(new DeleteTask({id: $event.id}))
  }
}
