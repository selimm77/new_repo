import {selectUpload} from '@app/dcm/store/dcm.selectors';
import {createSelector} from '@ngrx/store';

import {UploadState} from '../upload/upload.state';
import {CleansingState} from './cleansing.model';


export const selectCleansingState = createSelector(
  selectUpload,
  (state: UploadState) => state.cleansing
);

export const selectCleansingStage = createSelector(
  selectCleansingState,
  (cleansingState: CleansingState) => cleansingState.stage
);

export const selectCleansingLoading = createSelector(
  selectCleansingState,
  (cleansingState: CleansingState) => cleansingState.loading
);

export const selectCleansingData = createSelector(
  selectCleansingState,
  (cleansingState: CleansingState) => cleansingState.data
);

export const selectCleansingErrors = createSelector(
  selectCleansingState,
  (cleansingState: CleansingState) => cleansingState.errors
);

export const selectSelectedRows = createSelector(
  selectCleansingState,
  (cleansingState: CleansingState) => cleansingState.selectedRows
);

export const selectCleansingErrorsInfo = createSelector(
  selectCleansingState,
  (cleansingState: CleansingState) => cleansingState.errorsInfo
);

export const selectCleansingLoaded = createSelector(
  selectCleansingState,
  (cleansingState: CleansingState) => cleansingState.loaded
);

export const selectCleansingFailed = createSelector(
  selectCleansingState,
  (cleansingState: CleansingState) => cleansingState.failed
);

export const selectCleansingFlowId = createSelector(
  selectCleansingState,
  (cleansingState: CleansingState) => cleansingState.flowId
);

export const selectCleansingJobId = createSelector(
  selectCleansingState,
  (cleansingState: CleansingState) => cleansingState.jobId
);

export const selectCleansingDeleteOrUpdate = createSelector(
  selectCleansingState,
  (cleansingState: CleansingState) => cleansingState.deletedOrUpdated
);

export const selectCleansingCsMetadata = createSelector(
  selectCleansingState,
  (cleansingState: CleansingState) => cleansingState.csMetadata
);

export const selectCleansingHeaders = createSelector(
  selectCleansingState,
  (cleansingState: CleansingState) => cleansingState.headers
);

export const selectColumnState = createSelector(
  selectCleansingState,
  (cleansingState: CleansingState) => cleansingState.columnState
);

export const selectGroupColumnState = createSelector(
  selectCleansingState,
  (cleansingState: CleansingState) => cleansingState.groupColumn
);

export const selectColumnStructure = createSelector(
  selectCleansingState,
  (cleansingState: CleansingState) => cleansingState.columnStructure
);
//
export const selectFilterErrorsByType = createSelector(
  selectCleansingState,
  (cleansingState: CleansingState) => cleansingState.typeError
);

export const selectFilterErrorsByColumn = createSelector(
  selectCleansingState,
  (cleansingState: CleansingState) => cleansingState.filterColumn
);

export const selectFilterQuickSearch = createSelector(
  selectCleansingState,
  (cleansingState: CleansingState) => cleansingState.quickSearch
);

export const selectEditGrid = createSelector(
  selectCleansingState,
  (cleansingState: CleansingState) => cleansingState.editable
);

export const selectLocationsLoaded = createSelector(
  selectCleansingState,
  (cleansingState: CleansingState) => cleansingState.locationsLoaded
);

export const selectTimeStamp = createSelector(
  selectCleansingState,
  (cleansingState: CleansingState) => cleansingState.timeStamp
);

export const selectOldFileId = createSelector(
  selectCleansingState,
  (cleansingState: CleansingState) => cleansingState.oldFileId
);

export const selectOldUpload = createSelector(
  selectCleansingState,
  (cleansingState: CleansingState) => cleansingState.oldUpload
);
