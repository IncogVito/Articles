import {Injectable} from "@angular/core";
import {Action, Store} from "@ngrx/store";
import {combineLatestWith, map, Observable, switchMap, take, tap, withLatestFrom} from "rxjs";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {TasksService} from "../../service/tasks.service";
import {
  createTask,
  deleteTask,
  initialTasksLoaded,
  loadInitialTasks, updateTask,
  taskCreatedSuccessfully,
  tasksUpdated
} from "./task.actions";
import {selectTasksState} from "./task.selectors";
import {TaskModel} from "../../model/task.model";

@Injectable()
export class TaskEffects {

  constructor(private store: Store,
              private actions: Actions,
              private readonly tasksService: TasksService) {
  }

  public loadTasks: Observable<Action> = createEffect(() => {
    return this.actions.pipe(
      ofType(loadInitialTasks),
      switchMap(() => this.tasksService.loadInitialTasks()),
      map(result => initialTasksLoaded({success: true, tasks: result}))
    );
  });

  public removeTask: Observable<Action> = createEffect(() => {
    return this.actions.pipe(
      ofType(deleteTask),
      withLatestFrom(this.store.select(selectTasksState)),
      map(([taskToBeDeleted, state]) => {
        const allTasks: TaskModel[] = state.allTasks;
        const updatedTasks = allTasks.filter(task => task.id !== taskToBeDeleted.id);
        return tasksUpdated({tasks: updatedTasks})
      })
    )
  });

  public updateTask: Observable<Action> = createEffect(() => {
    return this.actions.pipe(
      ofType(updateTask),
      withLatestFrom(this.store.select(selectTasksState)),
      map(([taskToBeReset, state]) => {
        const allTasks: TaskModel[] = state.allTasks;
        const updatedTasks = allTasks.map(task => {
          if (task.id === taskToBeReset.id) {
            return {...task, resolved: taskToBeReset.resolved}
          } else {
            return task;
          }
        });
        return tasksUpdated({tasks: updatedTasks})
      })
    )
  });

  public createTask: Observable<Action> = createEffect(() => {
    return this.actions.pipe(
      ofType(createTask),
      map(payload => payload.content),
      map(content => taskCreatedSuccessfully({content: content, id: Date.now(), resolved: false}))
    );
  });

}
