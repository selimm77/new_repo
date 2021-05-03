import { LocationsState, Locations } from './locations.model';
import { LocationsActions, LocationsActionTypes } from './locations.actions';

export const initialState: LocationsState = {
  Locations : null,
  loaded : false,
  loading: false,
  failed: false,
};

export function LocationsReducer(
  state: LocationsState = initialState,
  action: LocationsActions
): LocationsState {
  switch (action.type) {
    case LocationsActionTypes.RESET:
      return initialState;

    default:
      return state;
  }
}
