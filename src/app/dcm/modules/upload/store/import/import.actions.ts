import {Action} from '@ngrx/store';
import { FileModel } from '../../models/import/file-model';
// mei fileData => fileData1
import {FileData, SheetModel} from './import.model';

export enum ImportActionTypes {
  UPDATE = '[Import] Update progress',
  SELECT_FILE = '[Import] select file',
  SELECT_SHEETS = '[Import] select sheets',
  UPLOAD_FILES = '[Import] upload files',
  START_IMPORT = '[Import] start file import',
  FINISH_IMPORT = '[Import] finish file import',
  FAIL_IMPORT = '[Import] finish file import',
  UPDATE_FILE_DATA = '[Import] Update file Data',
  GET_FILE_DATA = '[Import] Get file Data',
  SELECT_SHEET = '[Import] Select sheet',
  CANCEL_IMPORT = '[Import] cancel file import',
  IMPORTED_DATA = '[Import] import data',
  RESET = '[Import] Reset',
  UPDATE_FILE_ID = '[Import] update file id',
  UPDATE_WORK_FILES = '[Import] update workfiles'
}

export class ActionImportUpdate implements Action {
  readonly type = ImportActionTypes.UPDATE;

  constructor(readonly payload: { progress: number }) {
  }
}

export class ActionStartImport implements Action {
  readonly type = ImportActionTypes.START_IMPORT;

  constructor() {
  }
}

export class ActionFinishImport implements Action {
  readonly type = ImportActionTypes.FINISH_IMPORT;

  constructor(readonly payload: { file: any, worksheets: string[], workfiles: any, importMetadata: any }) {
  // constructor(readonly payload: { file: any, worksheets: string[], workfiles: any }) {
  // constructor(readonly payload: { filename: string, worksheetId: any}) {

  // constructor(readonly payload: { filename: string, worksheet: string }) {
  }
}

export class ActionCancelImport implements Action {
  readonly type = ImportActionTypes.CANCEL_IMPORT;

  constructor() {
  }
}

export class ActionSelectedFile implements Action {
  readonly type = ImportActionTypes.SELECT_FILE;

  // constructor(readonly payload: { file: File }) { }
  constructor(readonly payload: { file: File }) {}
}

export class ActionUploadFiles implements Action {
  readonly type = ImportActionTypes.UPLOAD_FILES;
    constructor(readonly payload: { file: File []}) { }
}

export class ActionUpdateFileData implements Action {
  readonly type = ImportActionTypes.UPDATE_FILE_DATA;
  constructor(readonly payload: { fileData: FileData }) {
  }
}

export class ActionUpdateFileId implements Action {
  readonly type = ImportActionTypes.UPDATE_FILE_ID;
  constructor(readonly payload: { fileId: string }) {
  }
}

export class ActionSelectSheet implements Action {
  readonly type = ImportActionTypes.SELECT_SHEET;
  constructor(readonly payload: { sheetIndex: number }) {
  }
}

export class ActionSelectedSheets implements Action {
  readonly type = ImportActionTypes.SELECT_SHEETS;
  constructor(readonly payload: { sheetsModel: SheetModel }) {
  }
}

export class ActionImportReset implements Action {
  readonly type = ImportActionTypes.RESET;
}

export class ActionGetDataImported implements Action {
  readonly type = ImportActionTypes.IMPORTED_DATA
  constructor(readonly payload: { data: any }) {
  }
}

export class ActionUpdateWorkFiles implements Action {
  readonly type = ImportActionTypes.UPDATE_WORK_FILES;
  constructor(readonly payload: { workFiles: FileModel[], sheetsModel: SheetModel }) {
  }
}

export type ImportActions =
  ActionImportUpdate
  | ActionImportReset
  | ActionStartImport
  | ActionFinishImport
  | ActionCancelImport
  | ActionUpdateFileData
  | ActionUpdateFileId
  | ActionSelectSheet
  | ActionGetDataImported
  | ActionSelectedFile
  | ActionUploadFiles
  | ActionSelectedSheets
  | ActionUpdateWorkFiles;
