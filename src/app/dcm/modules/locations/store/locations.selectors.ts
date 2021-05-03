import { LocationsState } from './locations.model';
import { createSelector } from '@ngrx/store';

import { selectCurrentState } from '@app/dcm/store/dcm.selectors';

export const selectLocations = createSelector(
  selectCurrentState,
  (state: LocationsState) => state.Locations
);
