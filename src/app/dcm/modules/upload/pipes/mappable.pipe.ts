import { MappingTargetItem } from './../models/mapping/mapping-target.model';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'mappable'
})
export class MappablePipe implements PipeTransform {

  transform(list: MappingTargetItem[], args?: any): any {
    return list.filter( t => t.mappable );
  }

}
