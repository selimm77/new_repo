import {Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef, Input} from '@angular/core';
import {Observable, of} from 'rxjs';
import {select, Store} from '@ngrx/store';
import {selectFileData, selectImported} from '@app/dcm/modules/upload/store/import/import.selectors';
import {AppState, selectRouterState} from '@app/core';
import { selectCleansingCsMetadata } from '@app/dcm/modules/upload/store/cleansing/cleansing.selectors';
import {Router} from '@angular/router';
import { CleansingService } from '@app/dcm/modules/upload/services/cleansing.service';
@Component({
  selector: 'anms-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class HeaderComponent implements OnInit {
  activeIcon$ = true;
  dataImported$: Observable<boolean>;
  currentRoute$: Observable<any>;
  fileMetaData$: Observable<any>;
  public csMetadata$: Observable<any>;
  public metadataLoaded;
  public loaded = false;
  public totalExposureFirstLoad;
  selectedCurrency = 'USD'
  currencies; 
  selectedDivision = 'division 1'
  divisions = [
    {value: 'division_1', viewValue: 'division 1'},
    {value: 'division_2', viewValue: 'division 2'},
    {value: 'division_3', viewValue: 'division 3'},
  ]

  @Input() metadata = null;

  constructor(private cdrf: ChangeDetectorRef,
    private cs: CleansingService,  private router: Router,
    private store$: Store<AppState>, private cleansingService: CleansingService) {
    this.fileMetaData$ = this.store$.pipe(select(selectFileData));
    this.dataImported$ = this.store$.pipe(select(selectImported));
    this.currentRoute$ = this.store$.pipe(select(selectRouterState));
    this.selectMetadata(this.store$);
    this.csMetadata$ = this.store$.pipe(select(selectCleansingCsMetadata));

  }

  ngOnInit() {
    this.grabMetaData();
    this.selectMetadata(this.store$);
    this.cleansingService.getCurrencies().subscribe((data: any) => {
      this.currencies = data.currencies;
      this.cdrf.detectChanges()
    })
  }

  private selectMetadata(store) {
    store.select(selectCleansingCsMetadata).subscribe((data) => {
      if (data) {
        this.metadataLoaded = data;
        if (this.metadataLoaded.totalExposures > 999) {
          this.totalExposureFirstLoad = this.metadataLoaded.totalExposures;
        }
        else {
          this.totalExposureFirstLoad = 210988;
        }
        }
    }, () => {
      this.cdrf.detectChanges();
    });
  }

  private grabMetaData() {
    this.cs.getCleansingCsMetadata().subscribe((data) => {
      if (data) {
        this.metadataLoaded = data;
        if (this.metadataLoaded.totalExposures) {
          this.totalExposureFirstLoad = this.metadataLoaded.totalExposures;
        }
        else {
          this.totalExposureFirstLoad = 0;
        }
        // this.loaded = true;
      }
    }, () => {
      this.cdrf.detectChanges();
    });
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
  
  locations(){
    this.router.navigate(['dcm/upload/locations']);
   }
  dashboard(){
    this.router.navigate(['dcm/upload/dashboard']);
   }
  cleansing(){
    this.router.navigate(['dcm/upload/cleansing']);
   }
}
