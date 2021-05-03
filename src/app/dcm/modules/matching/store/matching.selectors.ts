import { MatchingState } from './matching.model';
import { createSelector } from '@ngrx/store';

import { selectMatchingState } from '@app/dcm/store/dcm.selectors';

export const selectMatching = createSelector(
  selectMatchingState,
  (state: MatchingState) => state.matching
);
