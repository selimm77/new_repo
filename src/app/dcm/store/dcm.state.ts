import {ActionReducerMap, createFeatureSelector, MetaReducer, ActionReducer} from '@ngrx/store';
import {AppState} from '@app/core';
import {UploadState} from '../modules/upload/store/upload/upload.state';
import {LocationsState} from '../modules/locations/store/locations.model';
import * as fromUpload from '../modules/upload/store/upload/upload.state';
import * as fromConfig from '../modules/administration/store/config.state';
import {LocationsReducer} from '../modules/locations/store/locations.reducer';
import {MatchingState} from '../modules/matching/store/matching.model';
import {MatchingReducer} from '../modules/matching/store/matching.reducer';
import {
  LocationMapReducer,
  LocationMapState
} from '@app/dcm/modules/upload/containers/location-map/store-part/location-map.reducer';
import {ConfigadminState} from '@app/dcm/modules/administration/store/configadmin.model';
import {ConfigReducer} from '@app/dcm/modules/administration/store/configadmin.reducer';
import {ConfigState} from '@app/dcm/modules/administration/store/config.state';
import {
  GeneralLocationGeographicalReducer,
  GeneralLocationGeographicalState
} from '@app/shared/popups/general-location-info-popup/geographical/store-part/general-location-geographical.reducer';
import {
  LoadPopUpReducer,
  LoadPopUpState
} from '@app/shared/popups/general-location-info-popup/store-part/load-pop-up.reducer';

export const FEATURE_NAME = 'dcm';
export const selectDcm = createFeatureSelector<State, DcmState>(
  FEATURE_NAME
);

export const reducers: any = {
  upload: fromUpload.reducers,
  matching: MatchingReducer,
  current: LocationsReducer,
  generalLocationGeographicalState: GeneralLocationGeographicalReducer,
  popUp: LoadPopUpReducer,
  locationMap: LocationMapReducer,
  config: fromConfig.reducers
};

export interface DcmState {
  upload: UploadState
  matching: MatchingState
  current: LocationsState
  generalLocationGeographicalState: GeneralLocationGeographicalState
  popUp: LoadPopUpState
  locationMap: LocationMapState
  config : ConfigState
}

export interface State extends AppState {
  dcm: DcmState;
}
