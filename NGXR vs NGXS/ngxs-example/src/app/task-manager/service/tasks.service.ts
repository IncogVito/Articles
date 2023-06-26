import {Injectable} from '@angular/core';
import {Observable, of} from "rxjs";
import {TaskModel} from "../model/task.model";

@Injectable({
  providedIn: 'root'
})
export class TasksService {

  constructor() {
  }

  public loadInitialTasks(): Observable<TaskModel[]> {
    return of([
      {
        id: 1,
        content: "Some content of first task",
        resolved: true
      },
      {
        id: 2,
        content: "Second task",
        resolved: false
      }
    ])
  }
}
