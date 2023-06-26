import {TaskModel} from "../../model/task.model";
import {Action, Selector, State, StateContext, Store} from "@ngxs/store";
import {Injectable} from "@angular/core";
import {EMPTY, Observable, take, tap} from "rxjs";
import {TasksService} from "../../service/tasks.service";
import {TaskActions} from "./task.actions";

export interface TasksStateModel {
  allTasks: TaskModel[];
}

@State<TasksStateModel>({
  name: 'tasks',
  defaults: {allTasks: []}
})
@Injectable()
export class TasksState {

  public tasksState$: Observable<TasksStateModel> = EMPTY;

  constructor(private readonly store: Store,
              private readonly tasksService: TasksService) {
    this.tasksState$ = store.select(state => state['tasks']);
  }

  @Action(TaskActions.LoadInitialTasks)
  loadInitialTasks(ctx: StateContext<TasksStateModel>, action: TaskActions.LoadInitialTasks) {
    return this.tasksService.loadInitialTasks()
      .pipe(
        take(1),
        tap(result => {
          ctx.patchState({
            allTasks: result
          });
        }));
  }

  @Action(TaskActions.DeleteTask)
  deleteTask(ctx: StateContext<TasksStateModel>, action: TaskActions.DeleteTask) {
    const taskIdToBeDeleted = action.payload.id;
    const updatedTasks = ctx.getState().allTasks.filter(task => task.id !== taskIdToBeDeleted);

    ctx.patchState({
      allTasks: updatedTasks
    });
  }

  @Action(TaskActions.UpdateTask)
  updateTask(ctx: StateContext<TasksStateModel>, action: TaskActions.UpdateTask) {
    const resolvedFlag = action.payload.resolved;
    const taskIdToBeUpdated = action.payload.id;

    const updatedTasks = ctx.getState().allTasks.map(task => {
      if (task.id === taskIdToBeUpdated) {
        return {...task, resolved: resolvedFlag}
      } else {
        return task;
      }
    });

    ctx.patchState({
      allTasks: updatedTasks
    });
  }

  @Action(TaskActions.CreateTask)
  createTask(ctx: StateContext<TasksStateModel>, action: TaskActions.CreateTask) {
    const content = action.payload.content;
    const newTask: TaskModel = {content: content, id: Date.now(), resolved: false}

    ctx.patchState({
      allTasks: [...ctx.getState().allTasks, newTask]
    });
  }
}
