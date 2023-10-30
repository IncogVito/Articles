import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'upperCasePipe',
  standalone: true
})
export class UpperCasePipePipe implements PipeTransform {

  transform(value: string, ...args: unknown[]): string {
    return String(value).toUpperCase();
  }

}
