import {NgModule} from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {TaskManagerComponent} from "./task-manager/page/task-manager/task-manager.component";

const routes: Routes = [
  {path: '', pathMatch: 'full', redirectTo: 'tasks'},
  {path: 'tasks', component: TaskManagerComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
