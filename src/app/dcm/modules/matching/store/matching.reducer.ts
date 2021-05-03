import { MatchingState, Matching } from './matching.model';
import { MatchingActions, MatchingActionTypes } from './matching.actions';

export const initialState: MatchingState = {
  matching : null,
  loaded : false,
  loading: false,
  failed: false,
};

export function MatchingReducer(
  state: MatchingState = initialState,
  action: MatchingActions
): MatchingState {
  switch (action.type) {
    case MatchingActionTypes.RESET:
      return initialState;

    default:
      return state;
  }
}
