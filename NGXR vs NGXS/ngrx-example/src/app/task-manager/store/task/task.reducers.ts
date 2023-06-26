import {TasksState} from "./task.state";
import {createReducer, on} from "@ngrx/store";
import {initialTasksLoaded, taskCreatedSuccessfully, TasksLoadedActionPayload, tasksUpdated} from "./task.actions";
import {TaskModel} from "../../model/task.model";

const initialState: TasksState = {
  allTasks: []
}

export const tasksReducer = createReducer(
  initialState,
  on(initialTasksLoaded, (state: TasksState, payload: TasksLoadedActionPayload) => ({
    ...state,
    allTasks: payload.tasks
  })),
  on(tasksUpdated, (state: TasksState, payload: { tasks: TaskModel[] }) => ({
    ...state,
    allTasks: payload.tasks
  })),
  on(taskCreatedSuccessfully, (state: TasksState, payload: TaskModel) => ({
    ...state,
    allTasks: [...state.allTasks, payload]
  }))
);
