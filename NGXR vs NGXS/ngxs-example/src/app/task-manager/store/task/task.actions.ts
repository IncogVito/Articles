import {TaskModel} from "../../model/task.model";

export interface TasksLoadedActionPayload {
  success: boolean;
  tasks: TaskModel[];
}

export namespace TaskActions {
  export class LoadInitialTasks {
    static readonly type = '[Tasks] LoadInitialTasks';
  }

  export class CreateTask {
    static readonly type = '[Tasks] create task';

    constructor(public payload: { content: string }) {
    }
  }

  export class UpdateTask {
    static readonly type = '[Tasks] reset task';

    constructor(public payload: { id: number; resolved: boolean; }) {
    }
  }

  export class DeleteTask {
    static readonly type = '[Tasks] delete task';

    constructor(public payload: { id: number }) {
    }
  }
}
