import {GridLineInfo} from './../../../../../shared/customized-shared-location-grid/GridLineInfo';
import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {MatDialog, MatDialogRef} from '@angular/material';
import {AppState, NotificationService} from '@app/core';
import { Observable, BehaviorSubject, Subject} from 'rxjs';
import {Store} from '@ngrx/store';
import {Router} from '@angular/router';
import { selectCleansingCsMetadata, selectCleansingData, selectCleansingErrors, selectCleansingHeaders, selectCleansingLoading } from '../../store/cleansing/cleansing.selectors';
import { ActionColumnState, ActionColumnStructure, ActionLoadAllData, ActionLoadCsMetadata, ActionLoadErrors, ActionLoadHeaders } from '../../store/cleansing/cleansing.actions';
import { CleansingService } from '../../services/cleansing.service';
import { selectSavedUrlState } from '@app/settings';
import {GeneralLocationInfoPopupComponent} from '@app/shared/popups/general-location-info-popup/general-location-info-popup.component';
import {
  LoadLoadPopUps,
  LocationPopupVisibility
} from '@app/shared/popups/general-location-info-popup/store-part/load-pop-up.actions';
import {LocationModel} from '@app/shared/popups/general-location-info-popup/models/location.model';
import {selectPopupVisibility} from '@app/shared/popups/general-location-info-popup/store-part/load-pop-up.selectors';

@Component({
  selector: 'anms-upload-container',
  templateUrl: './upload-container.component.html',
  styleUrls: ['./upload-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class UploadContainerComponent implements OnInit {

  rowData$ = new BehaviorSubject<any[]>([])
  laoding$: Observable<boolean>;
  metadata$: BehaviorSubject<any> = new BehaviorSubject(null);
  exposure$: BehaviorSubject<any> = new BehaviorSubject(null);
  datacheck$: BehaviorSubject<any> = new BehaviorSubject(null);
  headers$: BehaviorSubject<any> = new BehaviorSubject(null);
  columnState$: BehaviorSubject<any> = new BehaviorSubject(null);
  columnStructure$: BehaviorSubject<any> = new BehaviorSubject(null);
  errosInfos$: Subject<any>;
  savedUrl$: Observable<string>;
  firstUpload: boolean = true;
  headerPrefix = 'target_';
  
  public metadata: any = null;
  public headers: any = null;
  public exposures: any = null;
  public datachecks: any = null;

  public responseModel;
  public metadataModel;
  public datacheckModel;

  public loaded = false;
  savedUrl = '';
  popupVisibility = false;

  constructor(public dialog: MatDialog, public notif: NotificationService, private store$: Store<AppState>,
    private cdrf: ChangeDetectorRef,
    private cs: CleansingService,
    private router: Router) {
    this.laoding$ = store$.select(selectCleansingLoading);
    this.savedUrl$ = store$.select(selectSavedUrlState);

    this.selectCleansingStore(this.store$);

    this.savedUrl$.subscribe((savedUrl) => {

      this.savedUrl = savedUrl;
    },
    () => {
      this.cdrf.detectChanges();
    })

  }

  ngOnInit() {
    this.savedUrl$.subscribe((savedUrl) => {

      this.savedUrl = savedUrl;
    },
    () => {
      this.cdrf.detectChanges();
    })
    const dataLoaded = this.grabCleasingData();
      if (dataLoaded) {
        this.selectCleansingStore(this.store$);
      }
      this.store$.select(selectPopupVisibility).subscribe(visibility => this.popupVisibility = visibility);
  }


  private selectCleansingStore(store) {
    store.select(selectCleansingErrors).subscribe((errors) => {
      if (errors) {
        this.datacheckModel = errors;
        this.datachecks = errors;
        this.datacheck$.next(errors);
      }
    },
      () => {
        this.cdrf.detectChanges();
      });

    store.select(selectCleansingCsMetadata).subscribe((metadata) => {
      if (metadata) {
        this.metadataModel = metadata;
        let metadataMod;
        const jobResult = metadata.jobResult;
        metadataMod = this.transformCheck(jobResult);
        this.responseModel = metadataMod;
        this.metadata = metadata;
        this.metadata$.next(metadata);
      }
    },
      () => {
        this.cdrf.detectChanges();
      });

    store.select(selectCleansingHeaders).subscribe((headers) => {
      if (headers) {
        this.headers = headers;
        this.headers$.next(headers);
        if (this.firstUpload) {
          this.isCleasingFinished();
        }
      }
    },
      () => {
        this.cdrf.detectChanges();
      });

    store.select(selectCleansingData).subscribe((data) => {
      if (data) {
        this.exposures = data;
        this.exposure$.next(data);
        if (this.firstUpload) {
          this.firstUpload = false;
          this.isCleasingFinished();
        }
      }
    },
      () => {
        this.cdrf.detectChanges();
      });
  }


  private grabCleasingData() {
    this.cs.getCleansingHeaders().subscribe((data) => {
      // { headers: res, columnState: columnStates.columnState, columnStructure: columnStates.columnStructure }
      this.headers = data['headers'];
      this.store$.dispatch(new ActionLoadHeaders({ headers: data['headers'] }));
      const initColunmState = data['columnState'];
      const columnStructure = data['columnStructure'];
      this.store$.dispatch(new ActionColumnState({columnState: initColunmState}));
      this.store$.dispatch(new ActionColumnStructure({columnStructure: columnStructure}));
      this.columnState$.next(data['columnState']);
      this.columnStructure$.next(data['columnStructure']);
      this.headers$.next(data['headers']);
    },
      () => {
        this.cdrf.detectChanges();
      }
    );

    this.cs.getCleansingExposures().subscribe((data) => {
      this.exposures = data;
      this.store$.dispatch(new ActionLoadAllData({ data: data }));
      this.exposure$.next(data);
    },
      () => {
        this.cdrf.detectChanges();
      }
    );

    this.cs.getCleansingDatacheck().subscribe((check) => {
      this.datachecks = check;
      this.datacheckModel = check;
      const errors = check;
      this.store$.dispatch(new ActionLoadErrors({ errors: errors }));
      this.datacheck$.next(check);
    },
      () => { },
      () => {
        this.cdrf.detectChanges();
      }
    );

    this.cs.getCleansingCsMetadata().subscribe((metadata) => {
      this.metadata = metadata;
      this.metadataModel = metadata;
      let metadataMod;
      const jobResult = metadata.jobResult;
      if (metadata) {
        this.metadata$.next(metadata);
        metadataMod = this.transformCheck(jobResult);
      }
      this.responseModel = metadataMod;
      this.store$.dispatch(
        new ActionLoadCsMetadata({ csMetadata: metadata })
      );
    }, () => {
        this.cdrf.detectChanges();
      });

    if (this.headers && this.exposures) {
      this.loaded = true;
    }
    return this.loaded;
  }

  private transformCheck(check) {
    const checkMod = [];
    for (const [key, value] of Object.entries(check)) {
      for (const [key2, value2] of Object.entries(value)) {
        const metadataTemp = {
          fieldCode: key2,
          fieldName: this.transformCodeToName(key2),
          errorsNumber: value2
        };
        checkMod.push(metadataTemp);
      }
    }
    return checkMod;
  }

  transformCodeToName(fieldCode) {
    // fieldCode.replace(/_/g, ' ');
    const fieldName = fieldCode.split('_').join(' ');
    return fieldName;
  }

  onEditRowClick(data: GridLineInfo) {
    let dialogRef = this.dialog.open(GeneralLocationInfoPopupComponent, {
      data: data
    });

    dialogRef.afterClosed().subscribe(result => {
      // Do something with result, if needed.
    });
  }

  onAddLocationClick() {
    // this.store$.dispatch(new LoadLoadPopUps({ location: new LocationModel() }));
    //
    let dialogRef = this.dialog.open(GeneralLocationInfoPopupComponent);
    dialogRef.afterClosed().subscribe(result => {
      // Do something with result, if needed.
    });
  }

 


  onGeneralDetailsSaved(): (value: any) => void {
    return result => {
      if (result)
        this.notif.success('Location saved');
    };
  }

  onCurrentLocationClick() {
    // TODO
  }



  onDeleteRowClick(data: GridLineInfo) {
    this.notif.error(`Line of index ${data.rowId} of id ${data.id} should be deleted`);
  }

  onGeocodeRowClick(data: GridLineInfo) {
    this.notif.warn(`Line of index ${data.rowId} of id ${data.id} should be geocoded`);
  }

  public goToAdmin() {
    this.router.navigate(['dcm/administration']);
  }

  isCleasingFinished() {
    // if (this.headers && this.exposures && this.metadata) {
      // console.log('isCleasingFinished => ')
      // console.log(this.headers)
      // console.log(this.exposures)
      if (this.headers && this.exposures) {
      return true;
    }
    return false;
  }
  private openGeneralLocationInfoPopup(): MatDialogRef<GeneralLocationInfoPopupComponent, any> {
    return this.dialog.open(GeneralLocationInfoPopupComponent, {width: '60%'});
  }

  isSaveSession() {
    if (this.savedUrl === undefined || this.savedUrl === '' || this.savedUrl === null) {
      return false
    }
    return true;
  }
}
