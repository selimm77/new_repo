import {Action} from '@ngrx/store';

export enum LoadPopUpActionTypes {
  LoadLoadPopUps = '[LoadPopUp] Load LoadPopUps',
  LoadAlertPopUps = '[LoadAlertPopUp] Load AlertPopUps',
  LocationPopup = '[LocationPopup] Location Popup'
}

export class LoadLoadPopUps implements Action {
  readonly type = LoadPopUpActionTypes.LoadLoadPopUps;

  constructor(public payload) {
  }
}

export class LoadAlertPopUps implements Action {
  readonly type = LoadPopUpActionTypes.LoadAlertPopUps;

  constructor(public payload?: { alertInfo: any }) {
  }
}

export class LocationPopupVisibility implements Action {
  readonly type = LoadPopUpActionTypes.LocationPopup;

  constructor(public payload: boolean) {
  }
}

export type LoadPopUpActions =
LoadLoadPopUps
| LoadAlertPopUps
| LocationPopupVisibility;
