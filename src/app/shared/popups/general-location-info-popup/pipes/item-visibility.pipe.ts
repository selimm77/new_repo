import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'itemVisibility',
  pure: false
})
export class ItemVisibilityPipe implements PipeTransform {

  transform(item: any, occupancyScheme): any {
    return !(item.conditional && occupancyScheme !== null && occupancyScheme !== 'ACCORD') ;
  }

}
