import {Observable, Subject, takeUntil} from "rxjs";
import {TasksStateModel} from "../store/task/task.state";
import {Store} from "@ngxs/store";
import {TaskActions} from "../store/task/task.actions";
import DeleteTask = TaskActions.DeleteTask;
import CreateTask = TaskActions.CreateTask;

export function performFullTest(store: Store, taskState$: Observable<TasksStateModel>) {
  const allRetries = [10, 200, 500, 1000, 10000];

  for (const retries of allRetries) {
    const result = performSingleBatch(store, taskState$, retries);
    console.log(`For ${retries} took avg. ${result}ms`)
  }
}

function performSingleBatch(store: Store, taskState$: Observable<TasksStateModel>, retries: number) {
  const results = [];
  for (let i = 0; i < 10; i++) {
    results.push(performSingleTest(store, taskState$, retries))
  }
  return results.reduce((sum, current) => sum + current, 0) / 10;
}

function performSingleTest(store: Store, taskState$: Observable<TasksStateModel>, retries: number) {
  const start = performance.now();
  const takeUntil$ = new Subject();

  taskState$.pipe(
    takeUntil(takeUntil$)
  ).subscribe(state => {
    for (const singleTask of state.allTasks) {
      store.dispatch(new DeleteTask({id: singleTask.id}))
    }
  })

  runAction(() => store.dispatch(new CreateTask({content: "Some content"})), retries);
  takeUntil$.next(true);
  const end = performance.now();
  return end - start;
}

function runAction(action: () => void, times: number) {
  for (let i = 0; i < times; i++) {
    action()
  }
}
