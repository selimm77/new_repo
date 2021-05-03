import { selectUpload } from '@app/dcm/store/dcm.selectors';
import { createSelector } from '@ngrx/store';

import { ImportState, Import, FileData } from './import.model';

import { UploadState } from '../upload/upload.state';

export const selectImportState = createSelector(
  selectUpload,
  (state: UploadState) => state.import
);

export const selectImportObjectState = createSelector(
  selectImportState,
  (importState: ImportState) => importState.import
);

export const selectImported = createSelector(
  selectImportObjectState,
  (object: Import) => object.imported
);

export const selectImportProgress = createSelector(
  selectImportObjectState,
  (object: Import) => object.progress
);

export const selectImporting = createSelector(
  selectImportObjectState,
  (object: Import) => object.importing
);

export const selectSelectedFile = createSelector(
  selectImportObjectState,
  (object: Import) => object.selectedFile
);

export const selectFiles = createSelector(
  selectImportObjectState,
  (object: Import) => object.files
);

export const selectWorkFiles = createSelector(
  selectImportObjectState,
  (object: Import) => object.workFiles
);

// mei
export const selectFileData = createSelector(
  selectImportObjectState,
  (object: Import) => object.fileData
);

export const selectToken = createSelector(
  selectFileData,
  (object: FileData) => (object && object.filename) ? object.filename : null
);

export const selectFileId = createSelector(
  selectFileData,
  (object: FileData) => (object && object.fileId) ? object.fileId : null
);

export const selectFileSheet = createSelector(
  selectImportObjectState,
  (object: Import) => object.selectedSheet
);

export const selectedSheets = createSelector(
  selectImportObjectState,
  (object: Import) => object.selectedSheets
);
