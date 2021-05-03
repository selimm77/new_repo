import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {Component, Inject, OnInit} from '@angular/core';

@Component({
  selector: 'dialog-overview-example-dialog',
  template: `
    <div style="font-size: small;">
      <div class="row">
        <div class="col-md-3">
          <span style="font-weight: bold;">Search Matching</span>
        </div>
      </div>
      <div class="row">
        <div class="col-md-2">
          <nz-divider style="margin-top: 8px;" class="ant-divider-horizontal-first"></nz-divider>
        </div>
      </div>
      <br>
      <div class="row" style="margin-top: -10px;">
        <div class="col-md-1">
          Name:
        </div>
        <div class="col-md-2">
          <input nz-input placeholder="Name" [nzSize]="'small'">
        </div>
        <div class="col-md-1">
          Country:
        </div>
        <div class="col-md-2">
          <nz-select style="width: 100%;" [nzSize]="'small'" nzShowSearch nzAllowClear nzPlaceHolder="Country"
                     [(ngModel)]="selectedValue">
            <nz-option nzLabel="FRANCE" nzValue="FRANCE"></nz-option>
            <nz-option nzLabel="US" nzValue="US"></nz-option>
          </nz-select>
        </div>
        <div class="col-md-1">
          PD Value:
        </div>
        <div class="col-md-1">
          <nz-input-number [nzSize]="'small'" [(ngModel)]="y" [nzMin]="1" [nzMax]="10" [nzStep]="1"
                           nzPlaceHolder="Min"></nz-input-number>
        </div>
        <div class="col-md-1">
          <nz-input-number [nzSize]="'small'" [(ngModel)]="x" [nzMin]="1" [nzMax]="10" [nzStep]="1"
                           nzPlaceHolder="Max"></nz-input-number>
        </div>
        <div class="col-md-1">
          Currency:
        </div>
        <div class="col-md-2">
          <nz-select style="width: 100%;" [nzSize]="'small'" nzShowSearch nzAllowClear nzPlaceHolder="Currency"
                     [(ngModel)]="selectedValue">
            <nz-option nzLabel="EUR" nzValue="EUR"></nz-option>
            <nz-option nzLabel="USD" nzValue="USD"></nz-option>
          </nz-select>
        </div>
      </div>

      <div class="row mt-2">
        <div class="col-md-1">
          Occupancy:
        </div>
        <div class="col-md-2">
          <input nz-input placeholder="Name" [nzSize]="'small'">
        </div>
        <div class="col-md-1" style="white-space: nowrap;">
          Pricing category:
        </div>
        <div class="col-md-2">
          <nz-select style="width: 100%;" [nzSize]="'small'" nzShowSearch nzAllowClear nzPlaceHolder="Country"
                     [(ngModel)]="selectedValue">
            <nz-option nzLabel="FRANCE" nzValue="FRANCE"></nz-option>
            <nz-option nzLabel="US" nzValue="US"></nz-option>
          </nz-select>
        </div>
        <div class="col-md-2">
          Pricing sub category:
        </div>
        <div class="col-md-4">
          <nz-select style="width: 100%;" [nzSize]="'small'" nzShowSearch nzAllowClear nzPlaceHolder="Currency"
                     [(ngModel)]="selectedValue">
            <nz-option nzLabel="EUR" nzValue="EUR"></nz-option>
            <nz-option nzLabel="USD" nzValue="USD"></nz-option>
          </nz-select>
        </div>
      </div>
      <div class="row mt-2">
        <div class="col-md-1">
          Name:
        </div>
        <div class="col-md-2">
          <input nz-input placeholder="Name" [nzSize]="'small'">
        </div>
      </div>
      <div class="row mt-2">
        <div class="col-md-10">
        </div>
        <div class="col-md-1" style="float: right;">
          <button style="background-color: #FF6666; border-color: #FF6666;"
                  [nzSize]="'small'" nz-button nzType="primary"><i class="fas fa-retweet"></i> Reset
          </button>
        </div>
        <div class="col-md-1">
          <button style="background-color: #005373; border-color: #005373;"
                  [nzSize]="'small'" nz-button nzType="primary"><i class="fas fa-search"></i> Search
          </button>
        </div>
      </div>
      <nz-divider></nz-divider>
      <p-table [columns]="scrollableCols" [value]="datasource" [scrollable]="true"
               scrollHeight="380px">
        <ng-template pTemplate="colgroup" let-columns>
          <colgroup>
            <col *ngFor="let col of columns">
          </colgroup>
        </ng-template>
        <ng-template pTemplate="header" let-columns>
          <tr>
            <th *ngFor="let col of columns">
              {{col.header}}
            </th>
          </tr>
        </ng-template>
        <ng-template pTemplate="body" let-rowData let-columns="columns">

          <tr>
            <td *ngFor="let col of columns" style="text-align: center;">
              {{rowData[col.field]}}
            </td>
          </tr>
        </ng-template>
      </p-table>
      <div class="row mt-2">
        <div class="col-md-10">
        </div>
        <div class="col-md-1" style="float: right;">
          <button style="background-color: #FF6666; border-color: #FF6666;"
                  [nzSize]="'small'" nz-button nzType="primary">
            <i class="fas fa-times"></i> Cancel
          </button>
        </div>
        <div class="col-md-1">
          <button style="background-color: #005373; border-color: #005373;" [nzSize]="'small'" nz-button
                  nzType="primary">
            <i class="fas fa-fingerprint"></i> Match
          </button>
        </div>
      </div>
    </div>
  `,
  styles: [`
    ::ng-deep .ant-divider-horizontal-first {
      display: block;
      height: 1px;
      width: 80%;
      min-width: 80%;
      margin: 24px 0;
    }
  `]
})
export class SearchMatchingPopupComponent implements OnInit {
  datasource: any[];
  totalRecords: number;
  cols: any[];
  scrollableCols: any[];
  frozenCols: any[];
  loading: boolean;

  constructor(
    public dialogRef: MatDialogRef<SearchMatchingPopupComponent>) {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit() {
    this.datasource = [];
    this.totalRecords = this.datasource.length;

    this.cols = [
      {field: 'name', header: 'Name'},
      {field: 'externalKey', header: 'External Key'},
      {field: 'country', header: 'Country'},
      {field: 'address', header: 'Address'},
      {field: 'distance', header: 'Distance (m)'},
      {field: 'pd', header: 'PD(USD)'},
      {field: 'occupancy', header: 'Occupancy'},
      {field: 'pricingCategory', header: 'Pricing Category'},
    ];


    this.scrollableCols = [
      {field: 'name', header: 'Name'},
      {field: 'externalKey', header: 'External Key'},
      {field: 'country', header: 'Country'},
      {field: 'address', header: 'Address'},
      {field: 'distance', header: 'Distance (m)'},
      {field: 'pd', header: 'PD(USD)'},
      {field: 'occupancy', header: 'Occupancy'},
      {field: 'pricingCategory', header: 'Pricing Category'},
    ];

    this.frozenCols = [];
    this.loading = false;
  }
}
