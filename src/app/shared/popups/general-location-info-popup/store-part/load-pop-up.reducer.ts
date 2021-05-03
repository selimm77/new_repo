import {Action} from '@ngrx/store';
import {LocationModel} from '@app/shared/popups/general-location-info-popup/models/location.model';
import {LoadPopUpActionTypes} from '@app/shared/popups/general-location-info-popup/store-part/load-pop-up.actions';


export class LoadPopUpState {
  location: LocationModel = new LocationModel();
  alertInfo: any;
  locationPopupVisibility: false;
}

export const initialState: LoadPopUpState = new LoadPopUpState();

export function LoadPopUpReducer(state = initialState, action): LoadPopUpState {
  switch (action.type) {
    case LoadPopUpActionTypes.LoadLoadPopUps:
      return action.payload;
    case LoadPopUpActionTypes.LoadAlertPopUps:
      return action.payload.alertInfo;
    case LoadPopUpActionTypes.LocationPopup:
      return {...state, locationPopupVisibility: action.payload};
    default:
      return state;
  }
}
