import {Component, OnInit} from '@angular/core';
import {LazyLoadEvent} from 'primeng/api';
import {MatDialog} from '@angular/material';
import {SearchMatchingPopupComponent} from '@app/dcm/modules/matching/popups/search-matching-popup.component';

@Component({
  selector: 'matching-grid-component',
  template: `
    <p-table [columns]="scrollableCols" [value]="datasource" [scrollable]="true"
             scrollHeight="380px">
      <ng-template pTemplate="colgroup" let-columns>
        <colgroup>
          <col *ngFor="let col of columns">
        </colgroup>
      </ng-template>
      <ng-template pTemplate="header" let-columns>
        <tr>
          <th class="td-th-center"></th>
          <th class="td-th-center"></th>
          <th *ngFor="let col of columns">
            {{col.header}}
          </th>
          <th class="td-th-center">Status</th>
        </tr>
      </ng-template>
      <ng-template pTemplate="body" let-rowData let-columns="columns">

        <tr>
          <td class="td-th-center"><label nz-checkbox [(ngModel)]="checked"></label></td>
          <td class="td-th-center"><i class="fas fa-plus" style="color: deepskyblue;"></i></td>
          <td *ngFor="let col of columns" style="text-align: center;">
            {{rowData[col.field]}}
          </td>
          <td class="td-th-center"><a (click)="openDialog()"><i class="fas fa-globe"
                                                                style="color: deepskyblue;"></i></a></td>
        </tr>
      </ng-template>
    </p-table>
  `,
  styles: [`
    .td-th-center {
      width: 40px;
      text-align: center;
    }
  `]
})
export class MatchingGridComponent implements OnInit {

  datasource: any[];
  totalRecords: number;
  cols: any[];
  scrollableCols: any[];
  frozenCols: any[];
  loading: boolean;

  constructor(public dialog: MatDialog) {
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(SearchMatchingPopupComponent, {
      width: '98%',
      data: {},
      position: {top: '80px'}
    });

    dialogRef.afterClosed().subscribe(result => {
    });
  }

  ngOnInit() {
    this.datasource = [{
      name: 'test', country: 'France', address: 'Paris', distance: '5km', accuracy: '',
      currency: 'EUR', occupancy: '', note: '', status: ''
    }, {
      name: 'test', country: 'France', address: 'Paris', distance: '5km', accuracy: '',
      currency: 'EUR', occupancy: '', note: '', status: ''
    }, {
      name: 'test', country: 'France', address: 'Paris', distance: '5km', accuracy: '',
      currency: 'EUR', occupancy: '', note: '', status: ''
    }, {
      name: 'test', country: 'France', address: 'Paris', distance: '5km', accuracy: '',
      currency: 'EUR', occupancy: '', note: '', status: ''
    }, {
      name: 'test', country: 'France', address: 'Paris', distance: '5km', accuracy: '',
      currency: 'EUR', occupancy: '', note: '', status: ''
    }, {
      name: 'test', country: 'France', address: 'Paris', distance: '5km', accuracy: '',
      currency: 'EUR', occupancy: '', note: '', status: ''
    }, {
      name: 'test', country: 'France', address: 'Paris', distance: '5km', accuracy: '',
      currency: 'EUR', occupancy: '', note: '', status: ''
    }, {
      name: 'test', country: 'France', address: 'Paris', distance: '5km', accuracy: '',
      currency: 'EUR', occupancy: '', note: '', status: ''
    }, {
      name: 'test', country: 'France', address: 'Paris', distance: '5km', accuracy: '',
      currency: 'EUR', occupancy: '', note: '', status: ''
    }, {
      name: 'test', country: 'France', address: 'Paris', distance: '5km', accuracy: '',
      currency: 'EUR', occupancy: '', note: '', status: ''
    }, {
      name: 'test', country: 'France', address: 'Paris', distance: '5km', accuracy: '',
      currency: 'EUR', occupancy: '', note: '', status: ''
    }];
    this.totalRecords = this.datasource.length;

    this.cols = [
      {field: 'name', header: 'Name'},
      {field: 'country', header: 'Country'},
      {field: 'address', header: 'Address'},
      {field: 'distance', header: 'Distance'},
      {field: 'accuracy', header: 'Accuracy'},
      {field: 'pd', header: 'PD'},
      {field: 'currency', header: 'Currency'},
      {field: 'occupancy', header: 'Occupancy'},
      {field: 'note', header: 'Note'},
    ];


    this.scrollableCols = [
      {field: 'name', header: 'Name'},
      {field: 'country', header: 'Country'},
      {field: 'address', header: 'Address'},
      {field: 'distance', header: 'Distance'},
      {field: 'accuracy', header: 'Accuracy'},
      {field: 'pd', header: 'PD'},
      {field: 'currency', header: 'Currency'},
      {field: 'occupancy', header: 'Occupancy'},
      {field: 'note', header: 'Note'},
    ];

    this.frozenCols = [];
    this.loading = false;
  }

}
