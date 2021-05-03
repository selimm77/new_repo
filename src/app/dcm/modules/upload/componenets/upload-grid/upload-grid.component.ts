import { Component, OnInit, Input,
  Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { GridLineInfo } from '@app/shared/customized-shared-location-grid/GridLineInfo';
import { Observable, BehaviorSubject } from 'rxjs';

@Component({
  selector: 'anms-upload-grid',
  templateUrl: './upload-grid.component.html',
  styleUrls: ['./upload-grid.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UploadGridComponent implements OnInit {
  @Input() prefix = '';
  @Input() editable = false;
  @Input() loading = false;
  @Input() errorsInfo$: Observable<any> = new Observable<any>();
  @Input() metadata = null;
  @Input() headers = null;
  @Input() exposures = null;
  @Input() datachecks = null;

  @Output() editLocationButtonClick = new EventEmitter<GridLineInfo>();
  @Output() geocodeLocationButtonClick = new EventEmitter<GridLineInfo>();
  @Output() cellEdited = new EventEmitter<GridLineInfo>();

  rowData$ = new BehaviorSubject<any[]>([])

  ngOnInit() {
    setTimeout(() => {
      const rowData = []
   /*   for (let index = 0; index < 15; index++) {
        rowData.push({id: index, a: 'test' + (index + 1) , b: 'test', c: 7, d:  'test' , e :  'test', f: 'test', g: 'test', h: 'test', i: 'test', j: 'test'
        , k:  'test', l:  'test', m:  'test', n: 'test', o:  'test', p: 'test', q: 'test', r: 'test', s: 'test', t: 'test'
        , u:  'test', v:  'test', w:  'test', x: 'test', y:  'test', z:  'test', ab:  'test', ac:  'test', ad:  'test', ae:  'test', af:  'test' })
      }*/
      this.rowData$.next(rowData)
    }, 0);
  }



  constructor() {

   }

   isLoading() {
     // console.log('===> is cleasing finished : ');
     // console.log(this.datachecks)
     // console.log(this.headers)
     // console.log(this.exposures)
     if (this.isDefined(this.headers) && this.isDefined(this.exposures)) {
       if (this.headers.length > 0) {
          return true;
        }
     }
     return false;
   }

   isDefined(element) {
     if (element !== undefined && element !== null) {
       return true;
     }
     return false;
   }
}
