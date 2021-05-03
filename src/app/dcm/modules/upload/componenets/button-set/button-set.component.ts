import { Component, OnInit, ChangeDetectionStrategy, Input, Output, EventEmitter, ViewChild, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { Store, select} from '@ngrx/store';
import { AppState, NotificationService } from '@app/core';
import { ActionCancelImport, ActionImportReset, ActionSelectedFile, ActionStartImport, ActionUpdateFileData, ActionUploadFiles } from '../../store/import/import.actions';
import { ActionCleansingReset, ActionColumnState, ActionColumnStructure, ActionEditGrid, ActionGetOldUpload, ActionLoadAllData, ActionLoadCsMetadata, ActionLoadHeaders, ActionLoadJobId } from '../../store/cleansing/cleansing.actions';
import { ActionMappingReset, ActionMappingUpdateTemplate } from '../../store/mapping/mapping.actions';
import { MappingTemplate, MappingTemplateViewModel } from '../../models/mapping/mapping-template.model';
import { selectImported, selectToken, selectFileId, selectFileData } from '@app/dcm/modules/upload/store/import/import.selectors';
import { MappingService } from '../../services/mapping.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NzModalService } from 'ng-zorro-antd';
import {Observable} from 'rxjs';
import { selectCleansingCsMetadata, selectCleansingData, selectCleansingHeaders, selectCleansingJobId, selectCleansingLoaded, selectCleansingLoading, selectColumnState, selectColumnStructure, selectEditGrid, selectGroupColumnState, selectOldFileId, selectOldUpload } from '../../store/cleansing/cleansing.selectors';
import { CleansingService } from '../../services/cleansing.service';
import { ActionSettingsSaveSession, selectSavedUrlState } from '@app/settings';
import {GridOptions} from '@ag-grid-enterprise/all-modules';
import { FileData } from '../../store/import/import.model';
import { UploadData } from '../../store/cleansing/cleansing.model';
import { selectMappingId } from '../../store/mapping/mapping.selectors';


@Component({
  selector: 'anms-button-set',
  templateUrl: './button-set.component.html',
  styleUrls: ['./button-set.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ButtonSetComponent implements OnInit {
  @Input() cleansing = false;

  @Output() AddLocationClick = new EventEmitter<string>();
  @Output() CurrentLocationClick = new EventEmitter();
  public activateBtn = true;
  selectedElement1 = 'Can edit'
  selectedElement2 = 'Read only'
  elements = [
    {value: 'can_edit', viewValue: 'Can edit'},
    {value: 'read_only', viewValue: 'Read only'}
  ]

  currencies = [
    {value: 'eur', viewValue: 'EUR'},
    {value: 'usd', viewValue: 'USD'},
  ]
  currency = 'usd';
  divisionOptions = [
    {value: 'all', viewValue: 'All Division'},
    {value: 'division_1', viewValue: 'Division 1'},
  ];
  division = 'division_1'


  uploaded$: Observable<boolean>
  columnState$: Observable<any[]>;
  columnState: any[];

  fileList: File[] = [];
  listOfFiles: any[] = [];
  @ViewChild('attachments') attachment: any;

  public _validFileExtensions = ['xlsx', 'xls', 'csv'];
  public isVisibleRestoreSession = false;

  dataImported$: Observable<boolean>;
  currentRoute$: Observable<any>;
  fileMetaData$: Observable<any>;

  fileId$: Observable<string>;
  fileId: string;
  savedUrl$: Observable<string>;
  savedUrl: string;
  isGridEditable$: Observable<boolean>;
  isGridEditable: boolean = true;

  laodingCleansing$: Observable<boolean>;
  laodedCleansing$: Observable<boolean>;

  loadedCleansing$: Observable<boolean>;
  loadedCleansing: boolean;

  jobId$: Observable<any>; 
  fileData$: Observable<FileData>; 
  csMetadata$: Observable<any>;
  headers$: Observable<any>; 
  exposures$: Observable<any>; 
  columnStructure$: Observable<any>;
  oldUpload$: Observable<UploadData>;
  mappingId$: Observable<any>;
  public mappingId;
  jobId
  fileData
  public metadataLoaded: any;
  headers
  exposures
  columnStructure
  oldUpload

  oldFileId$: Observable<string>;
  public oldFileId: string;

  public gridOptions: GridOptions;
  private params: any;
  private gridApi;
  
  public totalExposure: number = 0;
  public pdValue: number = 0;
  public biValue: number = 0;
  public totalTiv: number = 0;
  public selectedLocation: number = 0;
  public totalLocation: number = 0;

    constructor(private router: Router, private cleansingService: CleansingService, private cdrf: ChangeDetectorRef, private store: Store<AppState>, private servicemapping: MappingService, public dialog: MatDialog, private modal: NzModalService, private notif: NotificationService) { 
      this.gridOptions = <GridOptions>{};
    
      this.uploaded$ = this.store.pipe(select(selectImported));
      this.laodingCleansing$ = store.select(selectCleansingLoading);
    this.laodedCleansing$ = store.select(selectCleansingLoaded);
    this.fileId$ = this.store.select(selectFileId);
    this.savedUrl$ = this.store.select(selectSavedUrlState);
    this.isGridEditable$ = this.store.select(selectEditGrid);
    this.oldFileId$ = this.store.select(selectOldFileId);
    this.jobId$ = this.store.select(selectCleansingJobId);
    this.fileData$ = this.store.select(selectFileData);
    this.headers$ = this.store.select(selectCleansingHeaders);
    this.exposures$ = this.store.select(selectCleansingData);
    this.csMetadata$ = this.store.select(selectCleansingCsMetadata);
    this.columnState$ = store.select(selectColumnState);
    this.columnStructure$ = store.select(selectColumnStructure);
    this.oldUpload$ = store.select(selectOldUpload);
    this.mappingId$ = store.select(selectMappingId);
      this.grabMetaData();

      this.mappingId$.subscribe((mappingId) => {
        this.mappingId = mappingId;
      })

      this.jobId$.subscribe((data) => {
        if (data !== undefined && data !== null && data) {
          this.jobId = data;
        }
      },
        () => {
          this.cdrf.detectChanges();
        });
    
        this.fileData$.subscribe((data) => {
          if (data !== undefined && data !== null && data) {
            this.fileData = data;
          }
        },
          () => {
            this.cdrf.detectChanges();
          });

          this.headers$.subscribe((data) => {
            if (data !== undefined && data !== null && data) {
              this.headers = data;
            }
          },
            () => {
              this.cdrf.detectChanges();
            });

            this.exposures$.subscribe((data) => {
              if (data !== undefined && data !== null && data) {
                this.exposures = data;
              }
            },
              () => {
                this.cdrf.detectChanges();
              });

              this.columnStructure$.subscribe((data) => {
                if (data !== undefined && data !== null && data) {
                  this.columnStructure = data;
                }
              },
                () => {
                  this.cdrf.detectChanges();
                });

            this.oldUpload$.subscribe((data) => {
                if (data !== undefined && data !== null && data) {
                  this.oldUpload = data;
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

      this.csMetadata$.subscribe((data) => {
        if (data) {
            this.metadataLoaded = data;
            this.totalTiv = numberWithCommas(data.totalTIV);
            this.totalExposure = data.totalExposures;
            this.pdValue = numberWithCommas(data.totalPd);
            this.biValue = numberWithCommas(data.totalBi);
            this.selectedLocation = data.selectedLocations;
            this.totalLocation = data.totalLocations;
          }
          else {
            this.totalExposure = 0;
            this.pdValue = 0;
            this.biValue = 0;
            this.totalTiv = 0;
            this.selectedLocation = 0;
            this.totalLocation = 0;
  
          }
      }, () => {
        this.cdrf.detectChanges();
      });

    this.fileId$.subscribe((fileId: string) => {
      this.fileId = fileId;
    })

    this.columnState$.subscribe((colSt) => {
      if (colSt !== undefined) {
        this.columnState = colSt;
      }
    },
    () => {
      this.cdrf.detectChanges();
    })

    this.savedUrl$.subscribe((savedUrl) => {
      this.savedUrl = savedUrl;
    },
    () => {
      this.cdrf.detectChanges();
    })

    this.isGridEditable$.subscribe((editable) => {
      if (editable !== undefined) {
        this.isGridEditable = editable;
        this.activateBtn = !editable;
      }
    },
    () => {
      this.cdrf.detectChanges();
    })

    
  }

  ngOnInit() { }

  isCleasingFinished() {
    if (this.loadedCleansing) {
      return true;
    }
    return false;
  }

  private grabMetaData() {
    this.cleansingService.getCleansingCsMetadata().subscribe((data) => {
      if (data) {
          this.metadataLoaded = data;
          this.totalTiv = numberWithCommas(data.totalTIV);
          this.totalExposure= data.totalExposures;
          this.pdValue = numberWithCommas(data.pdValue);
          this.biValue = numberWithCommas(data.biValue);
          this.selectedLocation = data.selectedLocations;
          this.totalLocation = data.totalLocations;
        }
        else {
          this.totalExposure = 0;
          this.pdValue = 0;
          this.biValue = 0;
          this.totalTiv = 0;
          this.selectedLocation = 0;
          this.totalLocation = 0;
        }
        // this.loaded = true;
      
    }, () => {
      this.cdrf.detectChanges();
    });
  }

  agInit(params: any): void {
    this.params = params;
    this.gridApi = params.api;
    const rowIndex = this.params.rowIndex;
  }

  refresh(params: any): boolean {
    this.params = params;
    return true;
  };

  refreshGrid() {
    const params = {force: true};
    this.gridApi.refreshCells(params);
  }

  onImportClick()
  {
    this.router.navigate(['dcm/upload/import'])
  }

  onFileSelected(event) {
    let oldUpload: UploadData = {
      fileId: this.oldFileId,
      jobId: this.jobId,
      fileData: this.fileData, 
      headers: this.headers, 
      data: this.exposures, 
      csMetadata: this.metadataLoaded, 
      columnState: this.columnState, 
      columnStructure: this.columnStructure,
      mappingId: this.mappingId
    }
    if (this.oldUpload && (this.oldUpload['fileId'] === this.oldFileId)) {
      this.cancelUpload();
    }
    else {
      this.store.dispatch(new ActionGetOldUpload({ oldUpload: oldUpload }))
      this.cancelUpload();
      // console.log('##cancelUpload')
    }

    this.isVisibleRestoreSession = false;
    for (let i = 0; i <= event.target.files.length - 1; i++) {
      const selectedFile = event.target.files[i];
      let fileExtention = this.getExtension(selectedFile.name);
      if (!this._validFileExtensions.includes(fileExtention)) {
        fileExtention = 'none';
      }
      this.fileList.push(selectedFile);
      this.listOfFiles.push({name: selectedFile.name, extension: fileExtention});
    }
    this.attachment.nativeElement.value = '';
    
    if (this.isFileAutorized(this.listOfFiles)) {
      if (this.fileList) {
        this.router.navigate(['dcm/upload/import'])
        this.store.dispatch(new ActionUploadFiles({ file: this.fileList }));
        this.store.dispatch(new ActionSelectedFile({file: this.fileList[0]}));
        // this.store.dispatch(new ActionStartImport())
    }
    }
    else {
      this.resetUpload();
      this.error();
    }
    
  }

  isFileAutorized(files) {
    for (let i = 0; i < files.length; i++) {
      const ext = files[i].extension;
      if (!this._validFileExtensions.includes(ext)) {
        return false;
      }
    }
    return true;
  }

  error(): void {
    this.modal.error({
      nzTitle: 'Error message',
      nzContent: 'One or more files are not allowed to be uploaded'
    });
  }

  resetUpload() {
    this.attachment.nativeElement.value = '';
    this.fileList = [];
    this.listOfFiles = [];
    this.store.dispatch(new ActionImportReset());
    this.router.navigate(['dcm/upload'])

  }

  getExtension(file) {
    return file.split('.').pop();
  }

  cancelUpload() {
    console.log('clear before upload');
    this.store.dispatch(new ActionCancelImport());
    this.store.dispatch(new ActionImportReset());
    this.store.dispatch(new ActionMappingReset());
    this.store.dispatch(new ActionCleansingReset());

  }

  onImportNewClick() {
    // localStorage.clear();
    const isResetImport = this.onResetImport();
    const isResetMapping = this.onResetMapping();
    const isResetCleasing = this.onResetCleansing();
    
    if (isResetImport && isResetMapping && isResetCleasing) {
      localStorage.clear();
      this.router.navigate(['dcm/upload/import'])
    }
  }

  onAddLocationClick(){
    this.AddLocationClick.emit();
  }

  onCurrentLocationClick(){
    this.CurrentLocationClick.emit()
  }

  onResetImport() {
    localStorage.clear();
    this.store.dispatch(new ActionImportReset());
    return true;
  }
  onResetMapping() {
    localStorage.clear();
    this.store.dispatch(new ActionMappingReset());
    let liste: MappingTemplate[] = [];
    let token: string;
    this.store.select(selectToken).subscribe(data => token = data);
    this.servicemapping.getMappingList(token).subscribe((row: MappingTemplateViewModel[]) => {
      row.forEach((e: MappingTemplateViewModel) => {
        liste = [...liste, new MappingTemplate(e.id, e.name, e.user, e.lastUsedDate, false, e.template)];

      })
      this.store.dispatch(new ActionMappingUpdateTemplate({ template: liste }))
    });
    // this.router.navigate(['dcm/upload/import'])
    return true;
  }

  onResetCleansing() {
    localStorage.clear();
    this.store.dispatch(new ActionCleansingReset());
    return true;
  }

  onChangeAcces(event) {
    if (this.activateBtn === false) {
      console.log('= btn activated =')
      this.activateBtn = true;
      this.store.dispatch(new ActionEditGrid({editable: false}));
    }
    else {
      console.log('= btn disable =')
      this.activateBtn = false;
      this.store.dispatch(new ActionEditGrid({editable: true}));

    }
  }

  onExportDisplayedData() {
    const displayedCol = this.getDisplayedColumns(this.columnState)
    // exportDataAsCsv(params)
    // console.log(displayedCol)
    // this.gridApi.exportDataAsCsv(displayedCol);
    this.cleansingService.exportData(this.fileId, displayedCol).subscribe((response) => {
 
      if (response) {
        this.downLoadFile(response,'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', 'Export displayed data.xlsx')
        // this.downLoadFile(response,'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', 'Export displayed data.csv')
        // this.downLoadFile(response,'application/vnd.ms-excel', 'export.xlsx')
        this.notif.success('Export displayed data successfully');
      }

    })
  }

  onExportAllData() {    
    const allCol = this.getAllColumns(this.columnState)
    this.cleansingService.exportData(this.fileId, allCol).subscribe((response) => {
      
      if (response) {
        this.downLoadFile(response,'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', 'Export all data.xlsx')
        // this.downLoadFile(response,'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', 'Export all data.csv')
        // this.downLoadFile(response,'application/vnd.ms-excel', 'export.xlsx')
        this.notif.success('Export displayed data successfully');
      }
    })
  }
  
  downLoadFile(blob: any, filetype: string, filename: string) {

    let binaryData = [];
    binaryData.push(blob);
  
    const url = window.URL.createObjectURL(new Blob(binaryData, { type: filetype })); // <-- work with blob directly
     // create hidden dom element (so it works in all browsers)
     const a = document.createElement('a');
     a.setAttribute('style', 'display:none;');
     document.body.appendChild(a);
     // create file, attach to hidden element and open hidden element
     a.href = url;
     a.download = filename;
     a.click();
  }

  getDisplayedColumns(colState) {
    const displayedCol = [];
    for (let i = 0; i < colState.length; i++) {
      const elmtName = colState[i]['colId'];
      const elmtState = colState[i]['hide'];
      if (!elmtState) {
        displayedCol.push(elmtName)
      }
    }
    return displayedCol;
  }
  getAllColumns(colState) {
    const displayedCol = [];
    for (let i = 0; i < colState.length; i++) {
      const elmtName = colState[i]['colId'];
        displayedCol.push(elmtName)
    }
    return displayedCol;
  }

  onRestoreSession() {
    this.isVisibleRestoreSession = true;
  }

  handleOkRestoreSession() {
    this.isVisibleRestoreSession = false;
    if (this.savedUrl !== '') {
      this.router.navigate([this.savedUrl]);
    this.store.dispatch(new ActionSettingsSaveSession({url: ''}))

    }

  }

  handleCancelRestoreSession() {
    this.isVisibleRestoreSession = false;
    // this.cancelUpload();
  }
  numberWithCommas(number) {
    if (number)
      return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
    else return number;
  }
}

function numberWithCommas(number) {
  if (number)
      return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
    else return number;
}
