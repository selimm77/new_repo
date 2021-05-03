import {NotificationService} from '@app/core/notifications/notification.service';
import {AppState} from '@app/core';
import {FileImportService} from './../../services/file-import.service';
import {Injectable} from '@angular/core';
import {Action, Store} from '@ngrx/store';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {withLatestFrom, map} from 'rxjs/operators';

import {selectSelectedFile, selectFileData, selectFiles} from './import.selectors';
import {
  ActionStartImport,
  ImportActionTypes,
  ActionFinishImport,
  ActionImportUpdate,
  ActionCancelImport,
  ActionSelectedFile,
  ActionImportReset,
  ActionUpdateFileData,
  ActionUploadFiles,
  ActionSelectedSheets,
  ActionGetDataImported
} from './import.actions';
import { FileModel } from '../../models/import/file-model';
import { SheetModel } from './import.model';

export const FORM_KEY = 'DCM.IMPORT';

@Injectable()
export class ImportEffects {

  constructor(
    private actions$: Actions<Action>,
    private store$: Store<AppState>,
    private importService: FileImportService,
    private notif: NotificationService
  ) {
  }

  @Effect({dispatch: false})
  startImport = this.actions$.pipe(
    ofType<ActionStartImport>(ImportActionTypes.START_IMPORT),
    withLatestFrom(this.store$.select(selectFiles)),
    map(([action, files]) => {
      this.importService.upload(files)
        .subscribe(progress => {
          // console.log('progress: ')
          // console.log(progress)
          if (progress['done']) {
            const fileTemp = progress['file'];
            const indexFirst = Object.keys(progress['file'])[0];
            let contentSelectedFile = progress['file'][indexFirst];
            let worksheets = [];
            if (contentSelectedFile['worksheets_map']) { // excel
              worksheets = this.getKeyElements(contentSelectedFile['worksheets_map']);
            }
            else { // csv
              const fileName = this.getFileName(progress['file']['filename']);
              worksheets.push(fileName);
            }
            const workfiles = this.getWorkFiles(progress['file'])
            this.saveSelectedSheets(workfiles)

            this.store$.dispatch(new ActionFinishImport({ file: contentSelectedFile, worksheets: worksheets, workfiles: workfiles, importMetadata: progress['file'] }))
            this.notif.success('Uplaoded with success')
          } else {
            this.store$.dispatch(new ActionImportUpdate({progress: Number(progress)}))
          }
        }, err => {
          this.store$.dispatch(new ActionCancelImport())
          this.notif.error('Uplaod failed')
        })
    })
  );

  @Effect({dispatch: false})
  onFiles = this.actions$.pipe(
    ofType<ActionUploadFiles>(ImportActionTypes.UPLOAD_FILES),
    withLatestFrom(this.store$.select(selectFiles)),
    map(([action, files]) => {
      if (files) this.store$.dispatch(new ActionStartImport())
    })
  );

      filetype = 'xlsx';
      defaultPage = 1;
      defaultNrows = 50;
      defaultLobId = 1;
      defaultWorksheetSelected = 0;
      
  @Effect({dispatch: false})
  getMetaData = this.actions$.pipe(
    ofType<ActionFinishImport>(ImportActionTypes.FINISH_IMPORT),
    withLatestFrom(this.store$.select(selectFileData)),
    map(([action, fileData]) => {
      if (fileData.filename) {
        const fileExtension = this.getFileExtension(fileData.filename);
        let worksheetIdSelected;
        
        const newFileData = {
          filename: fileData.filename,
          fileId: fileData.fileId,
          worksheetId: fileData.worksheetId,
          filetype: fileData.filetype,
          page: this.defaultPage,
          nrows: this.defaultNrows,
          lobId: this.defaultLobId,
          isExcel: fileData.isExcel,
          document: fileData.document
        };
       
        if (fileData.isExcel) {
          /// console.log('== it s excel file ==>> ');
          const worksheetSelected = fileData.worksheet[this.defaultWorksheetSelected];
          worksheetIdSelected = fileData.worksheetId[worksheetSelected]
          newFileData['worksheet'] = fileData.worksheet;
        }
        else {
          // console.log('== not excel ==>> ');
          worksheetIdSelected = fileData.worksheetId[Object.keys(fileData.worksheetId)[0]];
          newFileData['worksheet'] = fileData.worksheet;
        }
        this.importService.getFileMetaData(newFileData, worksheetIdSelected).subscribe( metadata => {
          // this.store$.dispatch(new ActionUpdateFileData({fileData: metadata}));
          
          // if one file only imported show content
            if (metadata['worksheet'] && metadata['worksheet'].length === 1) {
                this.onSelectedFilename(metadata)
            }
            else {
              this.store$.dispatch(new ActionUpdateFileData({fileData: metadata}));
            }
          }
        )
      } else {
        this.notif.error('No token found. Please try again')
        this.store$.dispatch(new ActionImportReset())
      }
    })
  );
  public getFileExtension(filename) {
    return filename.split('.').pop();
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

  public getWorkFiles(files) {
    const fileM : FileModel[] = [];
    for (const [key1, value1] of Object.entries(files)) {
      const fileModel = new FileModel(key1, value1['file_id'], 'accent', false);
      if (value1['excel']){
        const subFileModelTemp : FileModel[] = [];
        for (const [key2, value2] of Object.entries(value1['worksheets_map'])) {
          const subFileModel : FileModel = new FileModel(key2, value2.toString(), 'primary', false);
          fileModel.addSheet(subFileModel);
        }
      }
      else {
        const subFileModelTemp : FileModel[] = [];
        if (value1) {
          const subFileModel : FileModel = new FileModel(this.getFileName(key1), value1['file_id'], 'primary', false);
          fileModel.addSheet(subFileModel);
        }
      }
      fileM.push(fileModel);
    }
    return fileM;
  }

  saveSelectedSheets(files) {
    // const files = this.task;
    /* const checkedNameSheet = [];
    const checkedIdSheet = [];
    for (const [key1, value1] of Object.entries(files)) {
      if (value1['sheet'].length > 0){
        for (const [key2, value2] of Object.entries(value1['sheet'])) {
          if (value2['checked']) {
            checkedIdSheet.push(value2['id']);
            checkedNameSheet.push(value2['name']);
          }
        }
      }
      else {
        if (value1['checked']) {
          checkedIdSheet.push(value1['id']);
          checkedNameSheet.push(value1['name']);
        }
      }
    }
    const checkedFile : SheetModel = {
      checkedIds: checkedIdSheet,
      checkedNames: checkedNameSheet,
      allfiles: null
    } */
    const checkedFile : SheetModel = {
      checkedIds: [],
      checkedNames: [],
      allfiles: null
    }
    this.store$.dispatch(new ActionSelectedSheets({sheetsModel: checkedFile}))
  }
  
  onSelectedFilename(metadata) {
    const index = 0;
    const worksheet = metadata['worksheet'][index];
    const worksheetId = metadata['worksheetId'][worksheet];

    if (metadata) {
        let data = metadata;
      const res = metadata['document']
  const newFileMetadata = {
          filename: data['filename'],
          filetype: data['filetype'],
          fileId: worksheetId,
          worksheetId: data['worksheetId'],
          page: data['page'],
          worksheet: data['worksheet'],
          totalRows: res['total'],
          nrows: 50,
          lobId: data['lobId'],
          isExcel: data['isExcel'],
          document: res
        }
        this.store$.dispatch(new ActionUpdateFileData({ fileData: newFileMetadata }));
        this.store$.dispatch(new ActionGetDataImported({data: res['data']}));
    }
  }
}
