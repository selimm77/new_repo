import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'mondatory',
  pure: false
})
export class MondatoryPipe implements PipeTransform {

  transform(value: any, field: any): any {
    return value[field] ? Object.values(value[field]).filter(e => e === true).length : 0;
  }

}
