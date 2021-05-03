import {FileData, ImportState, SheetModel} from './../../store/import/import.model';
import {AppState} from './../../../../../core/core.state';
import {Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef, AfterViewInit, Input, Output, EventEmitter, ViewChild} from '@angular/core';
import {Observable, of, BehaviorSubject} from 'rxjs';
import {FileImportService} from '../../services/file-import.service';
import {Store, select} from '@ngrx/store';
import {
  ActionSelectSheet,
  ActionSelectedFile,
  ActionImportReset,
  ActionStartImport, ActionGetDataImported, ActionUpdateFileData, ActionUploadFiles, ActionSelectedSheets, ActionUpdateWorkFiles, ActionCancelImport
} from '../../store/import/import.actions';
import {
  selectSelectedFile,
  selectImported,
  selectImporting,
  selectImportProgress,
  selectFileData,
  selectFileSheet, selectImportObjectState, selectFiles
} from '../../store/import/import.selectors';
import {take} from 'rxjs/operators';
import {selectMappingLoaded, selectMappingLocked} from '../../store/mapping/mapping.selectors';
import {FileSystemDirectoryEntry, FileSystemFileEntry, UploadEvent, UploadFile} from 'ngx-file-drop';

import { ActionMappingReset, ActionMappingUpdateTemplate } from '@app/dcm/modules/upload/store/mapping/mapping.actions';
import { ActionCleansingReset } from '@app/dcm/modules/upload/store/cleansing/cleansing.actions';
import { FileModel } from '../../models/import/file-model';
import { ValideImport } from '@app/dcm/popups/valide-import/valide-import.component';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NzModalService } from 'ng-zorro-antd';
import { Router } from '@angular/router';
import { selectOldFileId } from '../../store/cleansing/cleansing.selectors';


@Component({
  selector: 'anms-import-container',
  templateUrl: './import-container.component.html',
  styleUrls: ['./import-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ImportContainerComponent implements OnInit {
  file$: Observable<File[]>
  uploadProgress$: Observable<number>
  uploaded$: Observable<boolean>
  uploading$: Observable<boolean>
  public files: UploadFile[] = [];
  fileMetaData$: Observable<FileData>
  selectedSheet$: Observable<number>
  selectedFile$: Observable<File>
  headers$: BehaviorSubject<any[]> = new BehaviorSubject([])
  filesUploaded$: BehaviorSubject<any[]> = new BehaviorSubject([])
  data$: BehaviorSubject<any[]> = new BehaviorSubject([])
  totalRecords$: BehaviorSubject<number> = new BehaviorSubject(0)
  loading$: BehaviorSubject<boolean> = new BehaviorSubject(true)
  importData$: any;
  lockSelection$: Observable<boolean>;
  oldFileId$: Observable<string>;
  public oldFileId: string;
  uploadProgress: number = 0;
  simpleFile: boolean = true;
  public datatest;
  public lastPageChanged;
  public page = 0;
  public _validFileExtensions = ['xlsx', 'xls', 'csv'];
  public listStepProgress = [10, 20, 30, 40, 50, 70, 80, 90]
  fileList: File[] = [];
  listOfFiles: any[] = [];
  isVisible = false;
  allFiles: any;

  @ViewChild('attachments') attachment: any;

    nrows = 1500;
    datat;
    fileIndex;
    newData;
    selectedFile;
    defaultWorksheetSelected = 0;
    upFiles;

  constructor(private router: Router, private importService: FileImportService, private store: Store<AppState>, private cdrf: ChangeDetectorRef, public dialog: MatDialog, private modal: NzModalService) {
    this.file$ = this.store.pipe(select(selectFiles));
    // this.file$ = this.store.pipe(select(selectSelectedFile));
    this.uploadProgress$ = this.store.pipe(select(selectImportProgress));
    this.uploaded$ = this.store.pipe(select(selectImported));
    this.uploading$ = this.store.pipe(select(selectImporting));
    this.fileMetaData$ = this.store.pipe(select(selectFileData));
    this.selectedSheet$ = this.store.pipe(select(selectFileSheet));
    this.selectedFile$ = this.store.pipe(select(selectSelectedFile));
    // this.selectFilename$ = this.store.pipe(select(selectFilename))
    this.lockSelection$ = this.store.pipe(select(selectMappingLocked));
    this.importData$ = this.store.select(selectImportObjectState);
    this.oldFileId$ = this.store.select(selectOldFileId);

    /* if (this.files !== undefined) {
      this.onFileChanged(this.upFiles)
    } */
    
    this.oldFileId$.subscribe((oldFileId) => {
      if (oldFileId !== undefined && oldFileId !== null && oldFileId) {
        this.oldFileId = oldFileId;
      }
    },
      () => {
        this.cdrf.detectChanges();
      });

    this.file$.subscribe(file => {
      if (file) {
        this.upFiles = file;
        this.filenames = file[0].name;
        this.filesUploaded$.next(file);
        // this.onFileChanged(file)
        
      }
      else this.filenames = ''
    })
  
    this.uploadProgress$.subscribe(uploadProgress => {
      if (uploadProgress !== undefined && uploadProgress !== null) {
        if (uploadProgress > 100) {
          this.uploadProgress = 1;
          this.simpleFile = true;
        }
        else {
          this.uploadProgress = uploadProgress;
          if (this.listStepProgress.includes(uploadProgress)) {
            this.simpleFile = false;
          }
        }
      }
    })

  this.selectedSheet$.subscribe(index => {
    this.page = 1;
    // this.grabPreviewData(index);
  })

  this.selectedFile$.subscribe(file => {
        this.page = 1;
        if (file)
          this.selectedFile = file.name
      })
      this.importData$.subscribe((data) => {
        if (data.importMetadata) {
          this.newData = data;
          const listOfFiles = [];
          const objectFiles = {};
          
          for (const [key0, value0] of Object.entries(data.importMetadata)) {
            const listOfSheets = [];
            listOfFiles.push(key0);
            for (const [key1, value1] of Object.entries(value0['worksheets_map'])) {
              listOfSheets.push(key1);
            }
            objectFiles[key0] = listOfSheets;
          }
          this.allFiles = objectFiles;
          this.filesUploaded$.next(listOfFiles);
        }
    })
  }

  filenames = '';

  ngOnInit() {
    
  }
  
  public getData() {
    return this.datatest;
  }

  isInf(numb) {
    console.log(numb)
    if (numb > 100) {
      return false
    }
    return true;
  }
  
  /* onFileChanged(event: any) {
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
  } */

  onFileChanged(files) {
    for (let i = 0; i <= files.length - 1; i++) {
      const selectedFile = files[i];
      let fileExtention = this.getExtension(selectedFile.name);
      if (!this._validFileExtensions.includes(fileExtention)) {
        fileExtention = 'none';
      }
      this.fileList.push(selectedFile);
      this.listOfFiles.push({name: selectedFile.name, extension: fileExtention});
    }
    // this.attachment.nativeElement.value = '';
    this.onFileSelected();
  }



  removeSelectedFile(index) {
    // delete file from FileList
    if (this.fileList.length > 0 || this.listOfFiles.length > 0) {
      this.listOfFiles.splice(index, 1);
      this.fileList.splice(index, 1);
    }
  }

  /* private grabPreviewData(fileData: FileData, index: number) {
    if (fileData && fileData.filename) {
      this.loading$.next(true);
      const defaultWorksheet = fileData.worksheet[index];
      let worksheetIdSelected;
      if (fileData.isExcel) {
        worksheetIdSelected = fileData.worksheetId[defaultWorksheet];
      }
      else {
        // get value first obj
        worksheetIdSelected = fileData.worksheetId[Object.keys(fileData.worksheetId)[0]];
      }
        const newFileData = {
          filename: fileData.filename,
          fileId: fileData.fileId,
          filetype: fileData.filetype,
          page: fileData.page,
          lobId: fileData.lobId,
          nrows: fileData.nrows
        };
        this.importService.getFileData(newFileData, worksheetIdSelected).subscribe(res => {
        
        this.totalRecords$.next(res.count);
        this.headers$.next(res.headers);
        this.data$.next(res);

        this.store.dispatch(new ActionGetDataImported({data: res.data}));
        this.loading$.next(false);
        this.datatest = res.data;              
      });  
    }
  } */

  private grabPreviewData(index: number) {
    if (index != null && index != undefined) {
      this.fileMetaData$.pipe(take(1)).subscribe((fileData: FileData) => {
        if (fileData && fileData.filename) {
          this.loading$.next(true);
          const defaultWorksheet = fileData.worksheet[index];
          let worksheetIdSelected;
          if (fileData.isExcel) {
            worksheetIdSelected = fileData.worksheetId[defaultWorksheet];
          }
          else {
            // get value first obj
            worksheetIdSelected = fileData.worksheetId[Object.keys(fileData.worksheetId)[0]];
          }
            const newFileData = {
              filename: fileData.filename,
              fileId: fileData.fileId,
              filetype: fileData.filetype,
              page: fileData.page,
              lobId: fileData.lobId,
              nrows: fileData.nrows
            };
            this.importService.getFileData(newFileData, worksheetIdSelected).subscribe(res => {
            
            this.totalRecords$.next(res.count);
            this.headers$.next(res.headers);
            this.data$.next(res);

            this.store.dispatch(new ActionGetDataImported({data: res.data}));
            this.loading$.next(false);
            this.datatest = res.data;              
          });  
        }
      });
    }
      
  }

  onSheetChanged(event) {
    this.store.dispatch(new ActionSelectSheet({sheetIndex: event.value}));
  }

  
  onSelectionSheetChanged(checkedSheet: any) {
    // console.log('==> onSelectionSheetChanged : ')
    
    // console.log(checkedSheet)
    // console.log(this.allFiles)
    // console.log(this.allFiles[checkedSheet['file']])
    const sheets = this.allFiles[checkedSheet['file']];
    const selectedFile = checkedSheet['file'];
    let index = sheets.indexOf(checkedSheet['sheet']);

    if (index < 0) {
      index = 0;
    }
    this.onSelectedFilename(selectedFile, index);
    // this.store.dispatch(new ActionSelectSheet({sheetIndex: index}));

    // this.store.dispatch(new ActionSelectedSheets({sheetsModel: checkedFile}))
  }

  onSelectedFilename(value, index) {
    console.log('==> import value, index: ');
    console.log(value)
    console.log(index)
    this.fileIndex = value;
    if (this.fileIndex != null && this.fileIndex != undefined) {
        let data = this.newData;
        const newFileData = {
          filename: this.fileIndex,
          fileId: data['file_id'],
          filetype: data['filetype'],
          page: this.page,
          lobId: 1,
          nrows: 50
        };
      data = data.importMetadata[this.fileIndex]
  
      let worksheets = [];
      if (data['worksheets_map']) { // excel
        console.log('==> excel')
        worksheets = this.getKeyElements(data['worksheets_map']);
      }
      else { // csv
        console.log('==> csv')
        const fileName = this.getFileName(this.fileIndex);
        worksheets.push(fileName);
      }
      // console.log('container data => ')
      // console.log(data)
      this.importService.getFileData(newFileData, data['worksheets_map'][worksheets[index]]).subscribe(res => {
      // console.log('container res => ')
      // console.log(res)
        const newFileMetadata = {
          filename: this.fileIndex,
          filetype: data['filetype'],
          fileId: data['file_id'],
          worksheetId: data['worksheets_map'],
          page: this.page,
          worksheet: worksheets,
          totalRows: res['total'],
          nrows: 50,
          lobId: 1,
          isExcel: data['excel'],
          document: res
        }
  
        this.totalRecords$.next(res.count);
        this.headers$.next(res.headers);
        this.data$.next(res);
  
        this.store.dispatch(new ActionUpdateFileData({ fileData: newFileMetadata }));
        this.store.dispatch(new ActionGetDataImported({data: res.data}));
        this.loading$.next(false);
        this.datatest = res.data;
      });
    }
  }

  onPageSizeChanged(newPageSize) {
    console.log(newPageSize);    
  } 
  
  onBtLast(lastPageChanged) {
    this.lastPageChanged = lastPageChanged;
    const index = lastPageChanged.selectedSheet;
    this.page = lastPageChanged.lastPage;
    this.nrows = lastPageChanged.newNrows;
    // this.grabPreviewData(index);
    
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

  onFileSelected() {
    // this.cancelUpload();
    if (!this.oldFileId) {
      console.log('=== oldfileId null import ===')
      this.cancelUpload();
    }

    if (this.isFileAutorized(this.listOfFiles)) {
      if (this.fileList) {
      this.store.dispatch(new ActionUploadFiles({ file: this.fileList }));
      this.store.dispatch(new ActionSelectedFile({file: this.fileList[0]}));
    }
    }
    else {
      this.error();
    }
  }
  
  /* onFileSelected(event) {
    this.cancelUpload();
    
    if (this.isFileAutorized(this.listOfFiles)) {
      if (this.fileList) {
      this.store.dispatch(new ActionUploadFiles({ file: this.fileList }));
      this.store.dispatch(new ActionSelectedFile({file: this.fileList[0]}));
    }
    }
    else {
      // const dialogRef = this.dialog.open(ValideImport, {
      //   width: '450px',
      //   data: { }
      // });
      // dialogRef.afterClosed().subscribe(result => {
      //   console.log('The dialog was closed');
      // });
      // this.openAlertDialog();
      // this.showModal();
      this.error();
    }
    
  } */

  /* openAlertDialog() {
    const dialogRef = this.dialog.open(ValideImport,{
      data:{
        message: 'ONE OR MORE FILE NOT AUTORIZED TO UPLOAD',
        buttonText: {
          cancel: 'Done'
        }
      },
    });
  } */

  error(): void {
    this.modal.error({
      nzTitle: 'Error message',
      nzContent: 'One or more files are not allowed to be uploaded'
    });
  }

  showModal(): void {
    this.isVisible = true;
  }

  handleCancel(): void {
    this.isVisible = false;
  }

  startUpload() {
    console.log('===> startUpload')
    localStorage.clear();
    location.reload();
    this.cancelUpload();
    this.store.dispatch(new ActionStartImport());
  }

  resetUpload() {
    // this.attachment.nativeElement.value = '';
    this.fileList = [];
    this.listOfFiles = [];
    this.store.dispatch(new ActionCancelImport());
    this.store.dispatch(new ActionImportReset());
    this.store.dispatch(new ActionMappingReset());
    this.store.dispatch(new ActionCleansingReset());
    this.router.navigate(['dcm/upload'])

  }

  onLazyLoad(event) {
    this.page = Math.floor((event.first + 1) / this.nrows);
    this.selectedSheet$.pipe(take(1)).subscribe(index => {
      // this.grabPreviewData(index);
    })
  }

  dropped(event: UploadEvent) {
    for (const droppedFile of event.files) {
      if (droppedFile.fileEntry.isFile) {
        const fileEntry = droppedFile.fileEntry as FileSystemFileEntry;
        fileEntry.file((file: File) => {
          const files = [file];
          let fileExtention = this.getExtension(fileEntry.name);
      if (!this._validFileExtensions.includes(fileExtention)) {
        fileExtention = 'none';
      }
          this.listOfFiles.push({name: fileEntry.name, extension: fileExtention});
          this.fileList.push(file);
        });
      } else {
        // It was a directory (empty directories are added, otherwise only files)
        const fileEntry = droppedFile.fileEntry as FileSystemDirectoryEntry;
        this.store.dispatch(new ActionImportReset());
      }
    }
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

  public fileOver(event) {
    console.log(event);
  }

  public fileLeave(event) {
    console.log(event);
  }

  public getFileName(filename) {
    return filename.split('.').slice(0, -1).join('.');
  }
  public getKeyElements(obj) {
    const keys = [];
    for (const [key, value] of Object.entries(obj)) {
      keys.push(key);
    }
    return keys;
  }


  public validateSingleInput(oInput) {
    if (oInput.type === 'file') {
      const sFileName = oInput.value;
      if (sFileName.length > 0) {
        let blnValid = false;
        for (let j = 0; j < this._validFileExtensions.length; j++) {
          const sCurExtension = this._validFileExtensions[j];
          if (sFileName.substr(sFileName.length - sCurExtension.length, sCurExtension.length).toLowerCase() === sCurExtension.toLowerCase()) {

            blnValid = true;
            break;
          }
        }

        if (!blnValid) {
          alert('Sorry, ' + sFileName + ' is invalid, allowed extensions are: ' + this._validFileExtensions.join(', '));
          oInput.value = '';
          return false;
        }
      }
    }
    return true;
  }
}
