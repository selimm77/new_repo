import {Action} from '@ngrx/store';
import {LocationMapActionTypes} from 'app/dcm/modules/upload/containers/location-map/store-part/location-map.actions';
import {LocationModel} from '@app/shared/popups/general-location-info-popup/models/location.model';


export class LocationMapState {
  location: LocationModel;
  loaded: boolean;

  constructor() {
    this.loaded = false
  }
}

export const initialState: LocationMapState = new LocationMapState();

export function LocationMapReducer(state = initialState, action): LocationMapState {
  switch (action.type) {
    case LocationMapActionTypes.LoadLocationMaps:
      return {...action.payload};
    default:
      return state;
  }
}
