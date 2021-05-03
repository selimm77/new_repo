import { DcmState, selectDcm } from '@app/dcm/store/dcm.state';
import { createSelector } from '@ngrx/store';

export const selectUpload = createSelector(
  selectDcm,
  (state: DcmState) => state.upload
);

export const selectPopUp = createSelector(
  selectDcm,
  (state: DcmState) => state.popUp
);

export const selectLocationMap = createSelector(
  selectDcm,
  (state: DcmState) => state.locationMap
);

export const selectCurrentState = createSelector(
  selectDcm,
  (state: DcmState) => state.current
);

export const selectMatchingState = createSelector(
  selectDcm,
  (state: DcmState) => state.matching
);
export const selectConfigState = createSelector(
  selectDcm,
  (state: DcmState) => state.config
);
