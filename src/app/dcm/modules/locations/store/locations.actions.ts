import { Action } from '@ngrx/store';
import { Locations } from './locations.model';

export enum LocationsActionTypes {
  UPDATE = '[Locations] Update',
  RESET = '[Locations] Reset'
}

export class ActionLocationsUpdate implements Action {
  readonly type = LocationsActionTypes.UPDATE;
  constructor(readonly payload: { source: any[], target: any[] }) {}
}

export class ActionLocationsReset implements Action {
  readonly type = LocationsActionTypes.RESET;
}

export type LocationsActions = ActionLocationsUpdate | ActionLocationsReset;
