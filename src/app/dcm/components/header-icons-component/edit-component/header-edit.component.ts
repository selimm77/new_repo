import {Component, OnDestroy} from '@angular/core';
import {IHeaderGroupParams} from '@ag-grid-enterprise/all-modules';
import { INoRowsOverlayAngularComp } from '@ag-grid-community/angular';

@Component({
    templateUrl: 'header-edit.component.html',
    styleUrls: ['header-edit.component.scss']
})
export class HeaderEditComponent implements INoRowsOverlayAngularComp {
  public value;
    public params: IHeaderGroupParams;

  agInit(params): void {
    this.value = params.value;
  }
}
