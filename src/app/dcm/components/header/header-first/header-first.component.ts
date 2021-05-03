import {Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef} from '@angular/core';
import {Observable, of} from 'rxjs';
import {select, Store} from '@ngrx/store';
import {selectFileData, selectImported} from '@app/dcm/modules/upload/store/import/import.selectors';
import {AppState, selectRouterState} from '@app/core';
import { selectCleansingCsMetadata } from '@app/dcm/modules/upload/store/cleansing/cleansing.selectors';

@Component({
  selector: 'anms-header-first',
  templateUrl: './header-first.component.html',
  styleUrls: ['./header-first.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderFirstComponent implements OnInit {
  activeIcon$ = true;
  dataImported$: Observable<boolean>;
  currentRoute$: Observable<any>;
  fileMetaData$: Observable<any>;

  selectedCurrency = 'EUR'
  currencies = [
    {value: 'eur', viewValue: 'EUR'},
    {value: 'usd', viewValue: 'USD'},
  ]
  selectedValue = 'lucy';
  currency = 'usd';
  divisionOptions = [
    {value: 'all', viewValue: 'All Division'},
  ];
  division = 'all'

  constructor(private cdrf: ChangeDetectorRef, private store: Store<AppState>) {
    this.fileMetaData$ = this.store.pipe(select(selectFileData));
    this.dataImported$ = this.store.pipe(select(selectImported));
    this.currentRoute$ = this.store.pipe(select(selectRouterState));
  }

  ngOnInit() {
  }

  varActive() {
    this.activeIcon$ = false;
    this.cdrf.detectChanges()
  }

  varDesactivated() {
    this.activeIcon$ = true;
    this.cdrf.detectChanges()
  }

  onPageSizeChanged(event){
    const value = (<HTMLInputElement>document.getElementById('select-currency')).value;
    this.selectedCurrency = value;
  }
}
