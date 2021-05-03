import {MappingState} from './mapping.model';
import {createSelector} from '@ngrx/store';

import {UploadState} from '../upload/upload.state';
import {selectUpload} from '@app/dcm/store/dcm.selectors';

export const selectMappingState = createSelector(
  selectUpload,
  (state: UploadState) => state.mapping
);

export const selectMappingFilter = createSelector(
  selectUpload,
  (state: UploadState) => state.mapping.filter
);

export const selectMappingTargetFilter = createSelector(
  selectUpload,
  (state: UploadState) => state.mapping.targetFilter
);

export const selectMappingSourceFilter = createSelector(
  selectUpload,
  (state: UploadState) => state.mapping.sourceFilter
);

export const selectMappingSource = createSelector(
  selectMappingState,
  (state: MappingState) => state.source
);

// with newStructure
export const selectMappingId = createSelector(
  selectMappingState,
  (state: MappingState) => state.mappingId
);

export const selectMappingTarget = createSelector(
  selectMappingState,
  (state: MappingState) => state.target
);

export const selectMappingTemplate = createSelector(
  selectMappingState,
  (state: MappingState) => state.template
);

export const selectMappingLoading = createSelector(
  selectMappingState,
  (state: MappingState) => state.loading
);

export const selectMappingLoaded = createSelector(
  selectMappingState,
  (state: MappingState) => state.loaded
);

export const selectMappingParameters = createSelector(
  selectMappingState,
  (state: MappingState) => state.mappingParamaters
);

export const selectAllMappings = createSelector(
  selectMappingState,
  (state: MappingState) => state.mappings
);

export const selectInitMappings = createSelector(
  selectMappingState,
  (state: MappingState) => state.initMappings
);

export const selectMappingLocked = createSelector(
  selectMappingState,
  (state: MappingState) => state.loaded || state.loading
);

export const selectMappingfailed = createSelector(
  selectMappingState,
  (state: MappingState) => state.failed
);

export const selectSelectedMapping = createSelector(
  selectMappingState,
  (state: MappingState) => state.selectedMapping
);

export const selectMandataryItemsInSheetMapping = createSelector(
  selectMappingState,
  (state: MappingState) => state.mandataryItemsInSheet
);

export const selectisMandataryItemsInSheetMapping = createSelector(
  selectMappingState,
  (state: MappingState) => state.isFirstLoad
);

export const selectSheetsMapping = createSelector(
  selectMappingState,
  (state: MappingState) => state.sheets
);
