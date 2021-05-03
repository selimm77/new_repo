import {Action} from '@ngrx/store';

export enum GeneralLocationGeographicalActionTypes {
  LoadGeneralLocationGeographicals = '[GeneralLocationGeographical] Load GeneralLocationGeographicals'
}

export class LoadGeneralLocationGeographicals implements Action {
  constructor(public payload) {
  }

  readonly type = GeneralLocationGeographicalActionTypes.LoadGeneralLocationGeographicals;
}

export type GeneralLocationGeographicalActions = LoadGeneralLocationGeographicals;
