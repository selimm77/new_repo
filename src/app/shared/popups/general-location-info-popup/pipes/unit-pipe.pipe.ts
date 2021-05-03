import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'unitPipe'
})
export class UnitPipePipe implements PipeTransform {

  transform(value: any, unit): any {
    let result = value;
    if (result) {
      switch (unit) {
        case 'Thousands' : result = Number.parseFloat(result) * 1000; break;
        case 'Millions' : result = Number.parseFloat(result) * 1000000; break;
        default: break;
      }
    }
    return result;
  }

}
