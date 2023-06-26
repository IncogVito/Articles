import {createFeatureSelector} from "@ngrx/store";
import {TasksState} from "./task.state";

export const selectTasksState = createFeatureSelector<TasksState>("tasks");
