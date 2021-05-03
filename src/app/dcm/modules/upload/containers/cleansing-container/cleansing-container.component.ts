import {CleansingService} from './../../services/cleansing.service';
import {cleansingStage} from './../../store/cleansing/cleansing.model';
import {Observable, forkJoin, Subject, BehaviorSubject} from 'rxjs';
import {
  ActionCleansingReset,
  ActionLoadAllData,
  ActionLoadErrors,
  ActionLoadCsMetadata,
  ActionLoadHeaders,
  ActionFilterErrorsByColumn,
  ActionColumnState,
  ActionColumnStructure
} from './../../store/cleansing/cleansing.actions';
import {AppState} from '@app/core/core.state';
import {Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef} from '@angular/core';
import { Store, Action} from '@ngrx/store';
import {ActionCleansingStart} from '../../store/cleansing/cleansing.actions';
import {
  selectCleansingFlowId,
  selectCleansingStage,
  selectCleansingLoading,
  selectCleansingLoaded, selectCleansingDeleteOrUpdate,
  selectCleansingData, selectCleansingCsMetadata, selectCleansingErrors, selectCleansingHeaders, selectCleansingJobId
} from '../../store/cleansing/cleansing.selectors';
import { take } from 'rxjs/operators';
import {GridLineInfo} from '@app/shared/customized-shared-location-grid/GridLineInfo';
import {MatDialog, MatDialogRef} from '@angular/material';
import {NotificationService} from '@app/core';
import { selectImportObjectState } from '../../store/import/import.selectors';
import { Import } from '../../store/import/import.model';
import { Actions } from '@ngrx/effects';
import { Router } from '@angular/router';
import {GeneralLocationInfoPopupComponent} from '@app/shared/popups/general-location-info-popup/general-location-info-popup.component';
import {
  LoadLoadPopUps,
  LocationPopupVisibility
} from '@app/shared/popups/general-location-info-popup/store-part/load-pop-up.actions';
import {LocationModel} from '@app/shared/popups/general-location-info-popup/models/location.model';

@Component({
  selector: 'anms-cleansing-container',
  templateUrl: './cleansing-container.component.html',
  styleUrls: ['./cleansing-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CleansingContainerComponent implements OnInit {
  activeIcon$ = true;
  stage$: Observable<cleansingStage>;
  laoding$: Observable<boolean>;
  laoded$: Observable<boolean>;
  res: any = null;
  flowId$: Observable<any>;
  rowData$: Subject<any>;
  errors$: Subject<any>;
  errosInfos$: Subject<any>;
  csMetadata$: Observable<any>;
  importFileData$: Observable<Import>;
  headers$: BehaviorSubject<any> = new BehaviorSubject(null);
  columnState$: BehaviorSubject<any> = new BehaviorSubject(null);
  columnStructure$: BehaviorSubject<any> = new BehaviorSubject(null);
  metadata$: BehaviorSubject<any> = new BehaviorSubject(null);
  exposure$: BehaviorSubject<any> = new BehaviorSubject(null);
  datacheck$: BehaviorSubject<any> = new BehaviorSubject(null);
  jobId$: Observable<any>;
  jobId;

  public metadata: any = null;
  public headers: any = null;
  public exposures: any = null;
  public datachecks: any = null;
  public fileData;
  public selectedSheet;

  showSpinner = false;
  showFinish = false;
  headerPrefix = 'target_';
  public responseModel;
  public metadataModel;
  public datacheckModel;
  public loaded = false;
  public errorsModel;
  public totalErrors: number = 0;

  constructor(
    private store$: Store<AppState>,
    private cs: CleansingService,
    private cdrf: ChangeDetectorRef,
    public dialog: MatDialog,
    public notif: NotificationService,
    private actions$: Actions<Action>,
    private router: Router
  ) {
    this.stage$ = store$.select(selectCleansingStage);
    this.laoding$ = store$.select(selectCleansingLoading);
    this.laoded$ = store$.select(selectCleansingLoaded);
    this.flowId$ = store$.select(selectCleansingFlowId);
    this.csMetadata$ = store$.select(selectCleansingCsMetadata);
    this.importFileData$ = this.store$.select(selectImportObjectState);
    this.jobId$ = store$.select(selectCleansingJobId);

    this.jobId$.subscribe((jobId) => {
      this.jobId = jobId;
    })

    this.selectCleansingStore(this.store$);
    const dataLoaded = this.grabCleasingData();
    if (dataLoaded) {
      this.selectCleansingStore(this.store$);
    }

    this.importFileData$.subscribe((importData) => {
      this.fileData = importData.fileData;
      this.selectedSheet = importData.selectedSheet;
    })
    // not working
    this.store$.select(selectCleansingDeleteOrUpdate).subscribe(
      datax => {
        if (datax) {
          this.cs.getDataCleansingChangingPage().subscribe(
            (exposures) => {
              this.store$.dispatch(new ActionLoadAllData({ data: exposures }));
            },
            () => {},
            () => {
              this.cdrf.detectChanges();
            }
          );
        }
      },
      () => {},
      () => {
        this.cdrf.detectChanges();
      }
    );

    this.stage$.subscribe(data => {
      if (data === 'FINISH') {
        this.showFinish = true;
        setTimeout(() => {
          this.showFinish = false;
        }, 5000);
      }
    });
  }

  ngOnInit() {
    forkJoin(
      this.laoding$.pipe(take(1)),
      this.laoded$.pipe(take(1)),
      this.flowId$.pipe(take(1))
    ).subscribe(
      ([ing, ed, flowId]) => {

        if (ed) {
          // this.cs.snapshot(flowId).subscribe();
        }
        if (!ed && !ing) {
          this.store$.dispatch(new ActionCleansingStart());
        }
      },
      () => {
        this.cdrf.detectChanges();
      }
    );

  }

  private selectCleansingStore(store) {
    store.select(selectCleansingErrors).subscribe((errors) => {
      if (errors) {
        this.errorsModel = this.transformErrors(errors['errors']);
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
        this.totalErrors = metadata['totalErrors'];
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
      }
    },
      () => {
        this.cdrf.detectChanges();
      });

    store.select(selectCleansingData).subscribe((data) => {
      if (data) {
        this.exposures = data;
        this.exposure$.next(data);
      }
    },
      () => {
        this.cdrf.detectChanges();
      });
  }

  transformErrors(errors) {
    const errorsMod = {};
    for (const [key1, value1] of Object.entries(errors)) {
      for (const [key2, value2] of Object.entries(value1)) {
        errorsMod[key1] = value2;
      }
    }
    
    return errorsMod;
  }

  private grabCleasingData() {
    this.cs.getCleansingHeaders().subscribe((data) => {
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
        this.totalErrors = metadata['totalErrors'];
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
  run() {
    this.store$.dispatch(new ActionCleansingStart());
  }

  reset() {
    this.store$.dispatch(new ActionCleansingReset());
  }

  onSelectionErrors(event) {
    const colIdFiltered = event.colId;
    const btnState = event.btnState;
    const colIdList = [];
    const listFilteredErrors = this.errorsModel[colIdFiltered];
    if (btnState && colIdFiltered !== undefined && colIdFiltered !== '' && colIdFiltered !== null) {
      this.cs.getExposuresWithErrorByColCode(this.fileData, this.selectedSheet, colIdFiltered).subscribe((data) => {
        if (data) {
          // this.store$.dispatch(new ActionLoadAllData(Object.assign({}, { data: data })));
          this.store$.dispatch(new ActionLoadAllData({ data: data }));
          // not real check for filter, wait for back-end
          this.cs.getUpdateCheckFilter(this.fileData, data['first_page'], listFilteredErrors, colIdFiltered).subscribe((check) => {
            if (check) {
              colIdList.push(colIdFiltered);
              this.updateCsMetadata(this.jobId);
              this.store$.dispatch(new ActionLoadErrors({ errors: check }));
              // contents => ['','',...] Array()
              this.store$.dispatch(new ActionFilterErrorsByColumn({ filterColumn: { active: btnState, contents: colIdList, lists: listFilteredErrors } }))
            }
          }, () => {
            this.cdrf.detectChanges();
          })
        }
      }, () => {
        this.cdrf.detectChanges();
      })
    }
    else {
      this.cs.getExposures(this.fileData, this.selectedSheet).subscribe((data) => {
        if (data) {
          // this.store$.dispatch(new ActionLoadAllData(Object.assign({}, { data: data })));
          this.store$.dispatch(new ActionLoadAllData({ data: data }));
          this.cs.getUpdateCheck(this.fileData, this.selectedSheet, data['first_page']).subscribe((check) => {
            this.updateCsMetadata(this.jobId);
            this.store$.dispatch(new ActionLoadErrors({ errors: check }));
            this.store$.dispatch(new ActionFilterErrorsByColumn({ filterColumn: { active: btnState, contents: [] } }))
          })
        }
      })
    }

  }

  public updateCsMetadata(jobId) {
    this.cs.getUpdateCsMetadata(jobId).subscribe((data) => {
      if (data) {
        this.store$.dispatch(new ActionLoadCsMetadata({ csMetadata: data }));
      }
    }, err => {
      this.notif.error('Update data Error');
    })
  }

  transformCodeToName(fieldCode) {
    // fieldCode.replace(/_/g, ' ');
    const fieldName = fieldCode.split('_').join(' ');
    return fieldName;
  }

  onEditRowClick(data: any) {
    let dialogRef = this.dialog.open(GeneralLocationInfoPopupComponent, {
      data: data
    });

    dialogRef.afterClosed().subscribe(result => {
     
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
      if (result) this.notif.success('Location saved');
    };
  }

  onDeleteRowClick(data: GridLineInfo) {
    this.notif.error(
      `Line of index ${data.rowId} of id ${data.id} should be deleted`
    );
  }

  onGeocodeRowClick(data: GridLineInfo) {
    this.notif.warn(
      `Line of index ${data.rowId} of id ${data.id} should be geocoded`
    );
  }

  varActive() {
    this.activeIcon$ = false;
    this.cdrf.detectChanges()
  }

  varDesactivated() {
    this.activeIcon$ = true;
    this.cdrf.detectChanges()
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

  private openGeneralLocationInfoPopup(): MatDialogRef<GeneralLocationInfoPopupComponent, any> {
    return this.dialog.open(GeneralLocationInfoPopupComponent, {
      width: '60%'
    });
  }
  onClearLocalStorage() {
    localStorage.clear();
  }
  showRes() {}
}
