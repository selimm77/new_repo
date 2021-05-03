import {Action} from '@ngrx/store';
import {GeneralLocationGeographicalActionTypes} from '@app/shared/popups/general-location-info-popup/geographical/store-part/general-location-geographical.actions';


export class GeneralLocationGeographicalState {
  countries = new Map([
    ['US', 'United States'],
    ['PR', 'Puerto Rico'],
    ['CA', 'Canada'],
  ]);

  constructor() {
    this.countries.set('US', 'United States');
    this.countries.set('PR', 'Puerto Rico');
    this.countries.set('CA', 'Canada');

  }
}

export const initialState: GeneralLocationGeographicalState = new GeneralLocationGeographicalState();

export function GeneralLocationGeographicalReducer(state = initialState, action) {
  switch (action.type) {
    case GeneralLocationGeographicalActionTypes.LoadGeneralLocationGeographicals:
      return {...action.payload};
    default:
      return state;
  }
}
