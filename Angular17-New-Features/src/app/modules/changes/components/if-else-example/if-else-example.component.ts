import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-if-else-example',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './if-else-example.component.html',
  styleUrls: ['./if-else-example.component.scss']
})
export class IfElseExampleComponent {

  public statusStarted: boolean = true;
}
