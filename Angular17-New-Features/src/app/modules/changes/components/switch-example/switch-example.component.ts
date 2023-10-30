import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-switch-example',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './switch-example.component.html',
  styleUrls: ['./switch-example.component.scss']
})
export class SwitchExampleComponent {

  public switchCurrentValue = 1;

  changeSwitchValue() {
    this.switchCurrentValue = (this.switchCurrentValue+1 ) % 6
  }
}
