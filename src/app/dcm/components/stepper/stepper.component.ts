import {ActionCancelImport, ActionImportReset, ActionImportUpdate, ActionUpdateFileData, ActionUpdateFileId} from './../../modules/upload/store/import/import.actions';
import {ActionSettingsSaveSession, ActionSettingsToggleSidenav} from './../../../settings/settings.actions';
import {IMPORT_NAVIGATION} from './../../utils/enums/navigation.enum';
import {Component, OnInit, ChangeDetectionStrategy, Output, EventEmitter, ChangeDetectorRef} from '@angular/core';
import {Router} from '@angular/router';
import {Observable, BehaviorSubject, ReplaySubject} from 'rxjs';
import {Store, select} from '@ngrx/store';
import {selectRouterState, AppState} from '@app/core/core.state';
import {StepperSelectionEvent} from '@angular/cdk/stepper';
import {take, filter} from 'rxjs/operators';
import {selectSavedUrlState, selectSidenavState} from '../../../settings/settings.selectors';
import {ActionGetMappingId, ActionMappingReset, ActionMappingUpdateTemplate} from '@app/dcm/modules/upload/store/mapping/mapping.actions';
import {ActionCleansingReset, ActionColumnState, ActionColumnStructure, ActionQuicksearchReset, ActionGetTimeStamp, ActionLoadAllData, ActionUpdateOldFileId, ActionFilterQuickSearch, ActionFilterErrorsByType, ActionLoadJobId, ActionLoadHeaders, ActionLoadCsMetadata} from '@app/dcm/modules/upload/store/cleansing/cleansing.actions';
import {selectUpload} from '@app/dcm/store/dcm.selectors';
import {UploadState} from '@app/dcm/modules/upload/store/upload/upload.state';
import {element} from 'protractor';
import {MappingService} from '@app/dcm/modules/upload/services/mapping.service';
import {MappingTemplate, MappingTemplateViewModel} from '@app/dcm/modules/upload/models/mapping/mapping-template.model';
import {selectFileId, selectImported, selectImportProgress, selectFileData} from '@app/dcm/modules/upload/store/import/import.selectors';
import { selectCleansingCsMetadata, selectCleansingErrors, selectLocationsLoaded, selectOldFileId, selectOldUpload, selectTimeStamp } from '@app/dcm/modules/upload/store/cleansing/cleansing.selectors';
import { CleansingService } from '@app/dcm/modules/upload/services/cleansing.service';
import { FileData } from '@app/dcm/modules/upload/store/import/import.model';
import { UploadData } from '@app/dcm/modules/upload/store/cleansing/cleansing.model';

@Component({
  selector: 'anms-stepper',
  templateUrl: './stepper.component.html',
  styleUrls: ['./stepper.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StepperComponent implements OnInit {
  uploadState$;
  canNavigate$: BehaviorSubject<IMPORT_NAVIGATION> = new BehaviorSubject(-1);
  imported$: ReplaySubject<any> = new ReplaySubject(1);
  checkedFileImported: ReplaySubject<number> = new ReplaySubject(1);
  fileId$: Observable<string>;
  // savedUrl: string;
  fileId: string = '';
  currentUrl: string;
  isVisibleSaveClose = false;
  isErrorInCleansing = false;
  isAddReplaceVisible: boolean = false;
  isLocationSaved: boolean = false;
  locationsLoaded$: Observable<any>;
  uploadProgress$: Observable<number>;
  uploaded$: Observable<boolean>;
  metadata$: Observable<any>;
  fileData$: Observable<FileData>;
  timeStamp$: Observable<any>;
  oldFileId$: Observable<string>;
  oldUpload$: Observable<UploadData>;

  uploadProgress: number;
  uploaded: boolean = false;
  fileData: FileData;
  isAddLocation: boolean;
  metadata: any;
  oldUpload: UploadData;

  totalErrors;

  locationsLoaded: any;
  public oldLocations: number = 0;
  public newLocations: number = 0;
  public allLocations: number = 0;
  public limitTimeStamp = 1; // one hour
  public limitTimeStampTest = 0.05; // 3 minutes
  public timeStamp: any;
  public oldFileId: string;

  constructor(public store: Store<AppState>, private cdrf: ChangeDetectorRef, private router: Router, private servicecleansing: CleansingService, private servicemapping: MappingService) {
    this.fileId$ = this.store.select(selectFileId);
    this.isSidenavOpen$ = this.store.pipe(select(selectSidenavState))
    this.uploadProgress$ = this.store.pipe(select(selectImportProgress));
    this.uploaded$ = this.store.pipe(select(selectImported));
    this.metadata$ = this.store.select(selectCleansingCsMetadata);
    this.fileData$ = this.store.select(selectFileData);
    // locations loaded
    this.locationsLoaded$ = this.store.select(selectLocationsLoaded);
    this.timeStamp$ = this.store.select(selectTimeStamp);
    this.oldFileId$ = this.store.select(selectOldFileId);
    this.oldUpload$ = store.select(selectOldUpload);

    this.oldUpload$.subscribe((data) => {
      if (data !== undefined && data !== null && data) {
        this.oldUpload = data;
      }
    },
      () => {
        this.cdrf.detectChanges();
      });

    this.timeStamp$.subscribe((timeStamp) => {
      console.log('timeStamp$ => ');
      if (timeStamp !== undefined && timeStamp !== null && timeStamp) {
        
        this.timeStamp = timeStamp;
        const hours = this.getDifferenceDate(timeStamp, new Date());
        // console.log('difference => ');
        console.log(hours);
        
        /* // test for 3 minutes
        if (hours < this.limitTimeStampTest) {
          console.log('getDifferenceDate inf limitTimeStamp => ');
            this.isLocationSaved = true;
          } */

        if (hours < this.limitTimeStamp) {
        // console.log('getDifferenceDate inf limitTimeStamp => ');
          this.isLocationSaved = true;
        }
        else {
          // console.log('getDifferenceDate sup limitTimeStamp => ');
          this.isLocationSaved = false;
        }
      }
    },
      () => {
        this.cdrf.detectChanges();
      });

      this.oldFileId$.subscribe((oldFileId) => {
        if (oldFileId !== undefined && oldFileId !== null && oldFileId) {
          this.oldFileId = oldFileId;
        }
      },
        () => {
          this.cdrf.detectChanges();
        });

    this.locationsLoaded$.subscribe((locations) => {
      // this.isLocationSaved = true;
      
      if (locations !== undefined && locations !== null && locations) {
        this.locationsLoaded = locations;
        if (locations['OldTotalExposures']) {
          console.log('OldTotalExposures exist')
          // this.isLocationSaved = true;
        }
        
        this.oldLocations = locations['OldTotalExposures'];
        this.newLocations = locations['NewTotalExposures'];
        this.allLocations = locations['OldTotalExposures'] + locations['NewTotalExposures'];

      }
    },
      () => {
        this.cdrf.detectChanges();
      });

      this.fileId$.subscribe((fileId) => {
        if (fileId !== undefined) {
          this.fileId = fileId;
        }
      },
        () => {
          this.cdrf.detectChanges();
        });

    this.metadata$.subscribe((metadata) => {
      if (metadata !== undefined && metadata) {
        this.metadata = metadata;
        this.totalErrors = metadata['totalErrors'];
      }
    },
      () => {
        this.cdrf.detectChanges();
      });
      this.fileData$.subscribe((fileData) => {
        
          if (fileData !== undefined && fileData) {
          this.fileData = fileData;
        }
      },
        () => {
          this.cdrf.detectChanges();
        });

    store.select(selectCleansingErrors).subscribe((data) => {
      if (data) {
        if (data['errors'] !== {}) {
          this.isErrorInCleansing = true;
        }
      }
    },
      () => {
        this.cdrf.detectChanges();
      });

    this.store.select(selectUpload).subscribe(
      data => {
        if (data.import.import.selectedSheets !== undefined && data.import.import.selectedSheets.checkedIds !== undefined ) {
          this.checkedFileImported.next(data.import.import.selectedSheets.checkedIds.length)
        }
        else {
          this.checkedFileImported.next(0)
        }
        // console.log(data.mapping.mandataryItems)
        this.canNavigate$.next(data.mapping.mandataryItems);
        this.imported$.next(data.import.import.imported)
      }
    );
    this.currentRoute$.pipe(filter(route => route)).subscribe((route) => {
      const phase = route.state.url.split('/').pop()
      this.currentUrl = route.state.url;
      switch (phase) {
        case 'import':

          this.step$.next(IMPORT_NAVIGATION.IMPORT);
          break;
        case 'mapping':
          this.step$.next(IMPORT_NAVIGATION.MAPPING);
          break;
        case 'cleansing':
          this.step$.next(IMPORT_NAVIGATION.CLEANSING);
          break;
        case 'matching':
          this.step$.next(IMPORT_NAVIGATION.MATCHING);
          break;
        default :
          this.step$.next(-1)
      }
    })

    this.uploadProgress$.subscribe((data) => {
      this.uploadProgress = data;
    })

    this.uploaded$.subscribe((data) => {
      this.uploaded = data;
    })
  }

  @Output() toggleDrawerClick = new EventEmitter<any>()

  isSidenavOpen$: Observable<boolean>;

  currentRoute$: Observable<any> = this.store.pipe(select(selectRouterState));
  step$: BehaviorSubject<IMPORT_NAVIGATION> = new BehaviorSubject(-1);

  showRoute() {

  }

  ngOnInit() {
    
  }

  onExitClick() {
    this.cancelUpload()
  }

  gotoCleansing(){
    this.navigateToStep(2)
  }

  onPreviousClick() {
    this.step$.pipe(take(1)).subscribe((step: number) => this.navigateToStep(step - 1))
  }

  onSelectionChange(event: StepperSelectionEvent) {
    this.navigateToStep(event.selectedIndex)
  }

  navigateToStep(step: number) {
    if (step < 0) this.navigateToExit()

    switch (step) {
      case IMPORT_NAVIGATION.IMPORT:
        // this.cancelUpload()
        this.router.navigate(['dcm/upload/import']);
        break;
      case IMPORT_NAVIGATION.MAPPING:
        this.router.navigate(['dcm/upload/mapping']);
        break;
      case IMPORT_NAVIGATION.CLEANSING:
        this.router.navigate(['dcm/upload/cleansing']);
        break;
    }
  }

  navigateToExit() {
    this.router.navigate(['dcm/upload']);
  }

  cancelUpload() {
    // this.uploadProgress$.unsubscribe();
    // this.store.dispatch(new ActionImportUpdate({progress: null}));
    this.store.dispatch(new ActionCancelImport());
    this.store.dispatch(new ActionMappingReset());
    this.store.dispatch(new ActionImportReset());
    this.store.dispatch(new ActionCleansingReset());
    this.store.dispatch(new ActionSettingsSaveSession({url: ''}))
    this.store.dispatch(new ActionGetTimeStamp({timeStamp: null, oldFileId: null}));
    this.router.navigate(['dcm/upload']);
  }

  resetUpload() {
    const oldUpload: UploadData = this.oldUpload;
    if (this.oldUpload) {
      this.store.dispatch(new ActionLoadJobId({jobId: oldUpload.jobId}))
      this.store.dispatch(new ActionUpdateFileData({fileData: oldUpload.fileData}))
      this.store.dispatch(new ActionLoadHeaders({headers: oldUpload.headers}))
      this.store.dispatch(new ActionLoadAllData({data: oldUpload.data}))
      this.store.dispatch(new ActionLoadCsMetadata({csMetadata: oldUpload.csMetadata}))
      this.store.dispatch(new ActionColumnState({columnState: oldUpload.columnState}))
      this.store.dispatch(new ActionColumnStructure({columnStructure: oldUpload.columnStructure}))
      this.store.dispatch(new ActionGetMappingId({mappingId: oldUpload.mappingId}))
      
      this.router.navigate(['dcm/upload']);
    }
    else {
      this.cancelUpload();
    }
  }

  onToggleDrawerClick() {
    this.isSidenavOpen$.pipe(take(1)).subscribe(state => {
      this.store.dispatch(new ActionSettingsToggleSidenav({open: !state}))
    })
  }

  onSaveClick() {
    this.isVisibleSaveClose = true;
    // this.router.navigate(['dcm/upload']);
  }

  getDifferenceDate(oldData, currentData) {
    const dateOneObj01: any = new Date(oldData);
    const dateTwoObj02: any = new Date(currentData);
    const milliseconds = Math.abs(dateTwoObj02 - dateOneObj01);
    const hours = milliseconds / 36e5;
    return hours;
  }

  updateHeader() {
    this.servicecleansing.getHeadersEmptyTab(1).subscribe((data) => {
      const initColunmState = data['columnState'];
      const columnStructure = data['columnStructure'];
      this.store.dispatch(new ActionColumnState({columnState: initColunmState}));
      this.store.dispatch(new ActionColumnStructure({columnStructure: columnStructure}));
    },
      () => {
        this.cdrf.detectChanges();
      }
    );
  }

  onNextClick() {
    this.store.dispatch(new ActionFilterQuickSearch({ quickSearch: { active: false, contents: [] } }))
    this.store.dispatch(new ActionFilterErrorsByType({ typeError: { active: false, type: 'all' } }))
    this.store.dispatch(new ActionQuicksearchReset());
    this.step$.pipe(take(1)).subscribe((step: number) => {
      // this.store.dispatch(new ActionCleansingReset());
      if (step === 2) {
        this.updateHeader();
        // this.isAddReplaceVisible = true;
        // get from the backend
        if (this.isLocationSaved) {
          this.isAddReplaceVisible = true;
        }
        else {
          // save in store time temp
          this.store.dispatch(new ActionGetTimeStamp({timeStamp: new Date(), oldFileId: this.fileId}));
          this.gotoUpload();
        }
        // add or replace location here before redirection to upload
        // this.gotoUpload();
      }
      else {
        // console.log(self.window.name)
        this.navigateToStep(step + 1)
      }
    })
  }

  gotoUpload() {
        let fileId = this.fileId;
        this.store.dispatch(new ActionFilterQuickSearch({ quickSearch: { active: false, contents: [] } }))
        this.store.dispatch(new ActionFilterErrorsByType({ typeError: { active: false, type: 'all' } }))
        this.store.dispatch(new ActionQuicksearchReset());
        // add or replace location here before redirection to upload
        this.servicecleansing.applyCleansing(fileId).subscribe((data) => {
          if (data !== undefined) {
            console.log('= Save check successfuly =');
            console.log(data)
          }
          this.isAddReplaceVisible = false;

          this.router.navigate(['dcm/upload']);
        },err => {
          this.isAddReplaceVisible = false;
          console.log('=applyCleansing failed=')
          
          this.router.navigate(['dcm/upload']);
        })
  }

  // add locations
  replaceLocationBeforeUpload() {
    let fileId = this.fileId;
    let fileData = this.fileData;
    // let isAdd = this.isAddLocation;
    let oldFileId = this.oldFileId;
    // console.log('==> replaceLocationBeforeUpload: fileId, oldFileId')
    // console.log(fileId);
    // console.log(oldFileId);

    if (oldFileId) {
      this.servicecleansing.applyCleansing(fileId).subscribe((data) => {
        if (data !== undefined) {
              this.servicecleansing.getUpdateExposuresAfterAdd(fileId, fileData, oldFileId).subscribe((data) => {
          if (data !== undefined) {
            console.log('= getUpdateExposuresAfterAdd successfuly =');
            // this.isAddLocation = false;
            this.oldFileId = null;
            this.store.dispatch(new ActionLoadAllData({ data: data }));
            this.store.dispatch(new ActionUpdateFileId({fileId: data['merged_file_id']}))
            this.store.dispatch(new ActionUpdateOldFileId({ oldFileId: data['merged_file_id'] }));
            
            this.store.dispatch(new ActionFilterQuickSearch({ quickSearch: { active: false, contents: [] } }))
            this.store.dispatch(new ActionFilterErrorsByType({ typeError: { active: false, type: 'all' } }))
            this.store.dispatch(new ActionQuicksearchReset());
          }
          this.isAddReplaceVisible = false;

          this.router.navigate(['dcm/upload']);
        },err => {
          // this.isAddLocation = false;
          this.oldFileId = null;
          this.isAddReplaceVisible = false;
          console.log('=applyCleansing failed=')
          
          this.router.navigate(['dcm/upload']);
        })
        }
      },err => {
        // this.isAddLocation = false;
        this.oldFileId = null;
        this.isAddReplaceVisible = false;
        console.log('=applyCleansing failed=')
        
        this.router.navigate(['dcm/upload']);
      })
      // add or replace location here before redirection to upload
    }
    else {
      this.isAddReplaceVisible = false;
    }
    
    /* this.servicecleansing.addLocations(fileId).subscribe((data) => {
      if (data !== undefined) {
        console.log('= Save check successfuly =');
      }

      this.isAddReplaceVisible = false;

      this.router.navigate(['dcm/upload']);
    },err => {
      this.isAddReplaceVisible = false;
      console.log('=applyCleansing failed=')
      
      this.router.navigate(['dcm/upload']);
    }) */
}

  handleOkSaveClose() {
    this.isVisibleSaveClose = false;
    this.store.dispatch(new ActionSettingsSaveSession({url: this.currentUrl}))
    if (this.currentUrl) {
      this.router.navigate(['dcm/upload']);
    }
  }

  handleCancelSaveCloseNo() {
    this.isVisibleSaveClose = false;
    this.cancelUpload()
  }

  handleCancelSaveClose() {
    this.isVisibleSaveClose = false;
  }

  handleCancelAddReplace($event) {
    this.isAddReplaceVisible = false;
    console.log('= cancel add/replace location =');
  }

  handleOkReplace($event) {
    console.log('= api replace location =');
    // api replace location
    // this.isAddReplaceVisible = false;
    this.gotoUpload();
  }

  handleOkAdd($event) {
    // this.isAddLocation = true;
    // this.oldFileId = null;
    console.log('= api Add location =');
    this.replaceLocationBeforeUpload();
    // this.isAddReplaceVisible = false;
    // api Add location
    // this.gotoUpload();
  }

}
