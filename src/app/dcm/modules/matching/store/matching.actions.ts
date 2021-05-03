import { Action } from '@ngrx/store';
import { Matching } from './matching.model';

export enum MatchingActionTypes {
  UPDATE = '[Matching] Update',
  RESET = '[Matching] Reset'
}

export class ActionMatchingUpdate implements Action {
  readonly type = MatchingActionTypes.UPDATE;
  constructor(readonly payload: Matching ) {}
}

export class ActionMatchingReset implements Action {
  readonly type = MatchingActionTypes.RESET;
}

export type MatchingActions = ActionMatchingUpdate | ActionMatchingReset;
