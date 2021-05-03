import {Action} from '@ngrx/store';

export enum LocationMapActionTypes {
  LoadLocationMaps = '[LocationMapPopUp] Load LocationMaps'
}

export class LoadLocationMaps implements Action {
  readonly type = LocationMapActionTypes.LoadLocationMaps;

  constructor(public payload) {
  }
}

export type LocationMapActions = LoadLocationMaps;
