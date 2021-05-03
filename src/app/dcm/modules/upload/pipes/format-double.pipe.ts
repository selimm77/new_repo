import {Pipe, PipeTransform} from '@angular/core';
import {DecimalPipe} from '@angular/common';

@Pipe({name: 'decimalNumber'})
export class FormatDoublePipe implements PipeTransform {

  transform(value: any, args: string) {
    const pipe = new DecimalPipe('en-US');
    value = isNaN(value) ? 0 : +value;
    return pipe.transform(value, args);
  }


}
