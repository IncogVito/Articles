import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';


interface SampleItem {
  name: string
}

@Component({
  selector: 'app-looping-example',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './looping-example.component.html',
  styleUrls: ['./looping-example.component.scss']
})
export class LoopingExampleComponent {


  public items: SampleItem[] = [
    {name: "Watermelon"},
    {name: "Apple"},
    {name: "Banana"},
    {name: "Orange"},
    {name: "Kiwi"}
  ]
}
