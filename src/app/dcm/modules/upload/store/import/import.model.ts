import { FileModel } from "../../models/import/file-model";

export interface Import {
  imported: boolean;
  importing: boolean;
  selectedFile: File;
  files: File [];
  workFiles: any;
  selectedSheet: number; // one sheet selected to display
  fileModel: FileModel [];
  importMetadata: any; // response from backend
  selectedSheets: SheetModel; // all sheets selected to add in process
  fileData: FileData;
  progress: number;
  data?: any;
}

export interface SheetModel {
  checkedIds: string[], // sheet ids lists
  checkedNames: string[], // sheet names lists
  allfiles: any // files with sheets
}

export interface FileData {
  fileId: string,
  filename: string,
  worksheetId: any,
  filetype: string,
  page: number,
  worksheet: string[],
  totalRows: number, // number of rows in worksheet specific
  nrows: number, // numbre of rows to show
  isExcel: boolean,
  lobId: any,
  document: any // all file metadata uploaded
}

export interface ImportState {
  import: Import;
}
