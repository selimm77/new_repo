import {createSelector} from '@ngrx/store';
import {DcmState, selectDcm} from '@app/dcm/store/dcm.state';

export const selectPopupVisibility = createSelector(
  selectDcm,
  (state: DcmState) => {
    // console.log('My State', state);
    return state.popUp.locationPopupVisibility
  }
);
