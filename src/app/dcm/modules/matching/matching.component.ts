import {Store, select} from '@ngrx/store';
import {Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef} from '@angular/core';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

import {State as BaseSettingsState} from '@app/settings';

interface State extends BaseSettingsState {
}

@Component({
  selector: 'uplaod-main',
  template: `
    <div class="row mt-1 ml-1 mr-1 mb-1">
      <div class="col-md-12">
        <div class="row">

          <div class="col-md-6">
            <div class="row">
              <div class="col-md-4" style="font-weight: bold; font-size: small;">
                Matching parameters
              </div>
              <div class="col-md-8">
                <table style="float: left; margin-left: -64px;">
                  <tr>
                    <td *ngFor="let indicator of indicators">
                      <table>
                        <tr>
                          <td>
                            <div [style.background]="indicator.color" class="div-color"></div>
                          </td>
                          <td> {{indicator.value}}
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>
                </table>
              </div>
            </div>
          </div>

          <div class="col-md-6" style="font-weight: bold;">
            Matching Algorithm Result
          </div>
        </div>
        <br>
        <div class="row">
          <div class="col-md-6">
            Matching scope ( Number of location ) /
          </div>
          <div class="col-md-6">
            Insured value (%)
          </div>
        </div>
        <div class="row">
          <div class="col-md-6">
            <nz-row>
              <nz-col nzSpan="16">
                <nz-slider [nzMin]="1" [nzMax]="100" [(ngModel)]="value1"></nz-slider>
              </nz-col>
              <div nz-col nzSpan="3">
                <nz-input-number [nzMin]="1" [nzMax]="100" [ngStyle]="{ 'marginLeft': '16px' }"
                                 [(ngModel)]="value1" [nzSize]="'small'"></nz-input-number>
              </div>
            </nz-row>
          </div>
          <div class="col-md-6">
            <nz-row>
              <nz-col nzSpan="24">
                <nz-slider [nzDefaultValue]="100" [nzDisabled]="true"></nz-slider>
              </nz-col>
            </nz-row>
          </div>
        </div>
        <br>
        <div class="row">
          <div class="col-md-6">
            Matching acceptance criteria (%)
          </div>
          <div class="col-md-6">
            Number of location (%)
          </div>
        </div>
        <div class="row">
          <div class="col-md-6">
            <nz-row>
              <nz-col nzSpan="16">
                <nz-slider nzRange [nzDefaultValue]="[20, 50]"></nz-slider>
              </nz-col>
            </nz-row>
          </div>
          <div class="col-md-6">
            <nz-row>
              <nz-col nzSpan="12">
                <nz-slider [nzDefaultValue]="100" [nzDisabled]="true"></nz-slider>
              </nz-col>
            </nz-row>
          </div>
        </div>
        <div class="row mt-2 mb-2">
          <div class="col-md-3">
            <button nz-button nzType="primary" [nzSize]="'omitted'"><i class="fas fa-retweet"></i> Restart matching
            </button>

          </div>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-md-12">
        <nz-divider style="font-weight: bold;"></nz-divider>
      </div>
    </div>

    <div class="row mb-1">
      <div class="col-md-6"></div>
      <div class="col-md-2">Percent of scope matched</div>
      <div class="col-md-2">Number of locations</div>
      <div class="col-md-2">TIV</div>
    </div>
    <div class="row ml-0 mr-0">
      <div class="col-md-12">
        <matching-grid-component></matching-grid-component>
      </div>
    </div>
  `,
  styles: [`
    .ant-btn-primary {
      color: #fff;
      background-color: #005373;
      border-color: #005373;
    }

    nz-divider.ant-divider.ant-divider-horizontal {
      height: 2px !important;
    }

    .div-color {
      width: 10px;
      height: 10px;
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MatchingComponent implements OnInit {
  indicators: any[] = [
    {value: 'Not in escape', color: '#c48888'},
    {value: 'Hidden', color: '#a6a6a6'},
    {value: 'Manuel', color: '#ffa500'},
    {value: 'Auto', color: '#b1ffb1'},
    {value: 'Matched', color: '#008200'}];

  constructor(private store: Store<State>, private cdrf: ChangeDetectorRef) {
  }

  ngOnInit(): void {

  }
}
