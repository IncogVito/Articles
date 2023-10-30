import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NgIf } from '@angular/common';
import { UpperCasePipePipe } from './modules/changes/pipes/upper-case-pipe.pipe';
import { IfElseExampleComponent } from './modules/changes/components/if-else-example/if-else-example.component';
import { ResourceHandlerComponent } from './modules/changes/components/resource-handler/resource-handler.component';
import { LoopingExampleComponent } from "./modules/changes/components/looping-example/looping-example.component";
import { SwitchExampleComponent } from "./modules/changes/components/switch-example/switch-example.component";
@Component({
    standalone: true,
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    imports: [UpperCasePipePipe, NgIf, ResourceHandlerComponent, IfElseExampleComponent, LoopingExampleComponent, SwitchExampleComponent]
})
export class AppComponent {
  title = 'Angular17-New-Features';

  public isVisible: boolean = false;


  constructor() {
    setTimeout(() => {
      this.isVisible = true;
      console.log("Siema");
    }, 2000);


  }
}
