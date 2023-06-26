import {createAction, props} from '@ngrx/store';
import {TaskModel} from "../../model/task.model";

export const loadInitialTasks = createAction(
  '[Task] load initial tasks'
);

export interface TasksLoadedActionPayload {
  success: boolean;
  tasks: TaskModel[];
}

export const initialTasksLoaded = createAction(
  '[Tasks] initial tasks loaded',
  props<TasksLoadedActionPayload>()
);

export const createTask = createAction(
  '[Tasks] create task',
  props<{ content: string; }>()
);

export const taskCreatedSuccessfully = createAction(
  '[Tasks] task created successfully',
  props<TaskModel>()
);

export const updateTask = createAction(
  '[Tasks] reset task',
  props<{ id: number; resolved: boolean; }>()
);

export const deleteTask = createAction(
  '[Tasks] delete task',
  props<{ id: number; }>()
);

export const tasksUpdated = createAction(
  '[Tasks] tasks updated',
  props<{ tasks: TaskModel[] }>()
);
