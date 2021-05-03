import {createSelector} from "@ngrx/store";
import {selectConfigState} from "@app/dcm/store/dcm.selectors";
import {ConfigState} from "@app/dcm/modules/administration/store/config.state";
import {ConfigadminState} from "@app/dcm/modules/administration/store/configadmin.model";

export const selectConfigField = createSelector(
  selectConfigState,
  (state: ConfigState) => state.field
);

export const selectLob = createSelector(
  selectConfigField,
  (configadminState: ConfigadminState) => configadminState.lob
);

export const selectDatachecks = createSelector(
  selectConfigField,
  (configadminState: ConfigadminState) => configadminState.datachecksAdded
);
export const selectFields = createSelector(
  selectConfigField,
  (configadminState: ConfigadminState) => configadminState.fieldsAdded
);

export const selectGroups = createSelector(
  selectConfigField,
  (configadminState: ConfigadminState) => configadminState.groupsAdded
);
export const selectDone = createSelector(
  selectConfigField,
  (configadminState: ConfigadminState) => configadminState.doneGroup
);
