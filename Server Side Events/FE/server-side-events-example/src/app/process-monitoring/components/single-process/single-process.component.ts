import { Component, Input } from '@angular/core';
import { SingleProcessModel } from '../../model/single-process.model';

@Component({
  selector: 'app-single-process',
  templateUrl: './single-process.component.html',
  styleUrls: ['./single-process.component.scss']
})
export class SingleProcessComponent {

  @Input() 
  public singleProcess!: SingleProcessModel;

}
