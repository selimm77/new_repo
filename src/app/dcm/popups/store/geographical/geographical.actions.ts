import {Action} from '@ngrx/store';

export enum PopUpGeographicalActions {
  LOAD_GEOGRAPHICAL_STATE = '[POPupGeographical] Load geographical'
}

export class PopUpGeographicalLoadAction implements Action {
  readonly type = PopUpGeographicalActions.LOAD_GEOGRAPHICAL_STATE;

  constructor(public payload) {
  }
}

export type   PopUpGeographicalAction = PopUpGeographicalLoadAction
