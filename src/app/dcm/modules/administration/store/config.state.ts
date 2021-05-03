import {combineReducers} from "@ngrx/store";
import {ConfigReducer} from "@app/dcm/modules/administration/store/configadmin.reducer";
import {ConfigadminState} from "@app/dcm/modules/administration/store/configadmin.model";

export const reducers = combineReducers({
  field: ConfigReducer
});

export interface ConfigState {
  field: ConfigadminState
}
