import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ResourceHandlerComponent } from './modules/changes/components/resource-handler/resource-handler.component';

const routes: Routes = [
  {
    path: 'using',
    component: ResourceHandlerComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
