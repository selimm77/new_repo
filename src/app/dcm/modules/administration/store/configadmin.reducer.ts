import {ConfigadminState} from "@app/dcm/modules/administration/store/configadmin.model";
import {ConfigActions, ConfigActionTypes} from "@app/dcm/modules/administration/store/configadmin.actions";

export const initialState: ConfigadminState = {
  datachecksAdded: [],
  fieldsAdded: [],
  groupsAdded: [],
  lob: null,
  doneGroup:true
}

export function ConfigReducer(
  state: ConfigadminState = initialState,
  action: ConfigActions
): ConfigadminState {
  switch (action.type) {
    case ConfigActionTypes.SELECT_LOB :
      return {
        ...state,
        lob : action.payload.lob
      };
    case ConfigActionTypes.DONE_GROUP :
      return {
        ...state,
        doneGroup : action.payload.done
      };
    case ConfigActionTypes.ADD_DATACHECK :
      return  {
        ...state ,
        datachecksAdded :action.payload.datacheck
      }
    case ConfigActionTypes.ADD_FIELD :
      return  {
        ...state ,
        fieldsAdded :action.payload.field
      }
    case ConfigActionTypes.RESET :
      return  {
        ...initialState,
        lob : state.lob

      }
    case ConfigActionTypes.ADD_GROUP :
      return  {
        ...state ,
        groupsAdded :action.payload.group
      }
    default :
      return state
  }
}
