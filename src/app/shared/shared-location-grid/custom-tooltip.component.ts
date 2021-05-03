import { ChangeDetectorRef, Component, ViewEncapsulation } from '@angular/core';
import { ITooltipAngularComp } from '@ag-grid-community/angular';
import {Store} from '@ngrx/store';
import { AppState } from '@app/core';
import { Observable } from 'rxjs';
import { selectCleansingErrors } from '@app/dcm/modules/upload/store/cleansing/cleansing.selectors';

@Component({
    selector: 'tooltip-component',
    template: `
    <div class="custom-tooltip">
      <p>
        <span>Error</span>
      </p>
      <p><span>Type: </span>{{errorType}}</p>
    </div>
  `,
    styles: [
        `
      :host {
        position: absolute;
        width: 150px;
        height: 53px;
        border: 1px solid cornflowerblue;
        overflow: hidden;
        pointer-events: none;
        transition: opacity 1s;
        background-color: #fff;
      }

      :host.ag-tooltip-hiding {
        opacity: 0;
      }

      .custom-tooltip p {
        margin: 5px;
        white-space: nowrap;
      }

      .custom-tooltip p:first-of-type {
        font-weight: bold;
      }
    `,
    ],
})

/*
:host {
        position: absolute;
        width: 150px;
        height: 70px;
        pointer-events: none;
        transition: opacity 1s;
      }

*/

export class CustomTooltipComponent implements ITooltipAngularComp {
  datachecks$: Observable<any>;
    private params: any;
    private data: any;
    public colId;
    public rowIndex;
    public datachecks: any;
    public errorType;
    public errors;
    
    constructor(
      // private cleansingContainer: CleansingContainerComponent,
      // private importService: FileImportService,
      // private cleansingService: CleansingService,
      private store: Store<AppState>,
      private cdrf: ChangeDetectorRef
    ) {
      this.datachecks$ = this.store.select(selectCleansingErrors);
      
      this.datachecks$.subscribe((data) => {
            if (data) {
              this.datachecks = data;
              this.errors = data['errors'];
            }
          },
            () => {
              this.cdrf.detectChanges();
            });
    }

    agInit(params): void {
        this.params = params;
        this.data = params.api.getDisplayedRowAtIndex(params.rowIndex).data;
        // this.data.color = this.params.color || 'white';
        this.colId = this.getExactColId(this.params['column']['colId']);
        this.rowIndex = params.rowIndex;
        // console.log('===> params.rowIndex');
        // console.log(this.rowIndex)
        // console.log(this.errors)
        // console.log(this.colId)
        // console.log(this.errors[this.colId])
        this.errorType = Object.keys(this.errors[this.colId])[0]
        // console.log(this.errorType)
    }

    public getExactColId(colId) {
      if (colId !== undefined) {
        const colId1 = colId.split('_1').slice(0, -1).join('_1');
      if (colId1) {
        colId = colId1;
      }
      }
      return colId;
    }
}
