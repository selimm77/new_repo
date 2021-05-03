import { Cleansing, CleansingState } from './../cleansing/cleansing.model';
import { combineReducers, createSelector } from '@ngrx/store';

import { ImportReducer } from '../import/import.reducer';
import { MappingState } from './../mapping/mapping.model';
import { ImportState } from '../import/import.model';
import { MappingReducer } from '../mapping/mapping.reducer';
import { CleansingReducer } from '../cleansing/cleansing.reducer';

export const reducers = combineReducers({
  mapping: MappingReducer,
  import: ImportReducer,
  cleansing: CleansingReducer,
});

export interface UploadState {
  mapping: MappingState;
  import: ImportState;
  cleansing: CleansingState;
}
