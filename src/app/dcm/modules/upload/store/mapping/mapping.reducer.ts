import {MappingTemplate} from './../../models/mapping/mapping-template.model';
import {MappingState} from './mapping.model';
import {MappingActions, MappingActionTypes} from './mapping.actions';
import {MappingParamaters} from '../../models/mapping/mapping-paramaters.model';

const initialSource = []

const initialTarget = []

const initialMappings = null


export const initialState: MappingState = {
  source: [...initialSource] || [],
  target: [...initialTarget] || [],
  template: [],
  mappingParamaters: new MappingParamaters(),
  mandataryItems: 0,
  mandataryItemsInSheet: 0,
  isFirstLoad: true,
  mappingId: '',
  mappings: initialMappings,
  initMappings: initialMappings,
  selectedMapping: 0,
  sheets: null,

  filter: 'All',
  targetFilter: '',
  sourceFilter: '',
  loading: false,
  loaded: false,
  failed: false
};

export function MappingReducer(
  state: MappingState = initialState,
  action: MappingActions
): MappingState {
  switch (action.type) {
    case MappingActionTypes.UPDATE_MANDATARY_ITEMS:
      return {
        ...state,
        mandataryItems: action.payload.mandataryItems
      };
      case MappingActionTypes.UPDATE_MANDATARY_ITEMS_IN_SHEET:
        return {
          ...state,
          mandataryItemsInSheet: action.payload.mandataryItemsInSheet,
          isFirstLoad: action.payload.isFirstLoad
        };
        case MappingActionTypes.SELECTED_SHEETS_MAPPING:
      return {
        ...state,
        sheets: action.payload.sheets
      };
    case MappingActionTypes.FILTER:
      return {
        ...state,
        filter: action.payload.filter
      };
      case MappingActionTypes.MAPPING_ID:
      return {
        ...state,
        mappingId: action.payload.mappingId
      };
      case MappingActionTypes.TARGET_FILTER:
      return {
        ...state,
        filter: action.payload.targetFilter
      };
      case MappingActionTypes.SOURCE_FILTER:
      return {
        ...state,
        filter: action.payload.sourceFilter
      };
    case MappingActionTypes.UPDATE:
      return {
        ...state,
        source: [...action.payload.source],
        target: [...action.payload.target]
      };
    // +++ New Actions +++
    case MappingActionTypes.UPDATE_TARGET:
      return {
        ...state,
        target: [...action.payload.target]
      };
    case MappingActionTypes.UPDATE_ONE_TARGET:
      const index = state.target.findIndex(t => t.value === action.payload.target.value)
      const newTargets = [...state.target]
      newTargets.splice(index, 1, action.payload.target);
      return {
        ...state,
        target: newTargets
      };
    case MappingActionTypes.UPDATE_SOURCE:
      return {
        ...state,
        source: [...action.payload.source]
      };
    case MappingActionTypes.UPDATE_TEMPLATE:
      return {
        ...state,
        template: [...action.payload.template]
      };
    case MappingActionTypes.UPDATE_PARAMETERS:
      return {
        ...state,
        mappingParamaters: {...action.payload.parameters}
      };
    // --- New Actions ---
    case MappingActionTypes.RESET:
      return initialState;

    case MappingActionTypes.GET_MAPPING_DATA:
      return {
        ...state,
        source: [],
        target: [],
        mappingId: '',
        // meiNew
        mappings: null,
        loading: true,
        loaded: false,
        failed: false
      };

    case MappingActionTypes.GET_MAPPING_DATA_SUCCESS:
      return {
        ...state,
        source: [...action.payload.source],
        target: [...action.payload.target],
        mappingId: action.payload.mappingId,
        selectedMapping: action.payload.selectedMapping,
        // meiNew
        // mappings: action.payload.mappings,
        loading: false,
        loaded: true,
      };

      case MappingActionTypes.MAPPINGS:
        return {
          ...state,
          mappings: action.payload.mappings,
          loading: false,
          loaded: true,
        };
        case MappingActionTypes.INIT_MAPPINGS:
        return {
          ...state,
          initMappings: action.payload.initMappings
        };
      case MappingActionTypes.SELECTED_MAPPING:
        return {
          ...state,
          selectedMapping: action.payload.selectedMapping,
          loading: false,
          loaded: true,
      };
    case MappingActionTypes.GET_MAPPING_DATA_FAILED:
      return {
        ...state,
        loading: false,
        loaded: false,
        failed: true
      };

    default:
      return state;
  }
}
