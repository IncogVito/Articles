import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {StoreModule} from '@ngrx/store';
import {TaskManagerModule} from "./task-manager/task-manager.module";
import {AppRoutingModule} from './app-routing.module';
import {TaskEffects} from "./task-manager/store/task/task.effects";
import {EffectsModule} from "@ngrx/effects";
import {StoreDevtoolsModule} from "@ngrx/store-devtools";
import {tasksReducer} from "./task-manager/store/task/task.reducers";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    StoreModule.forRoot({tasks: tasksReducer}, {}),
    EffectsModule.forRoot([TaskEffects]),
    TaskManagerModule,
    AppRoutingModule,
    StoreDevtoolsModule.instrument({
      maxAge: 25, // Retains last 25 states
      logOnly: false // Restrict extension to log-only mode
    }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
