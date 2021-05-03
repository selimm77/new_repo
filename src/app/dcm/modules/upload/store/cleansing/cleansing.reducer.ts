import {CleansingState, UploadData} from './cleansing.model';
import {CleansingActions, CleansingActionTypes} from './cleansing.actions';
import CleansingUtils from '../../utils/Cleansing-utils';

const initialData = null
const initialErrors = null
const initialCsMetadata = null
const initialHeaders = null

export const initUpload: UploadData = {
  fileId: null,
  jobId: null,
  fileData: null,
  headers: null,
  data: null,
  csMetadata: null,
  columnState: [],
  columnStructure: [],
  mappingId: null
}

export const initialState: CleansingState = {
  filters: {},
  stage: 'STANDBY',
  page: 1,
  limit: 15,
  statistics: {},
  deletedOrUpdated: false,
  flowId: null,
  loading: false,
  loaded: false,
  failed: false,
  selectedRows: [],
  datachek: null,
  data: null,
  errors: null,
  headers: null,
  csMetadata: null,
  jobId: null,
  errorsInfo: null,
  stageBeforeLoad: 'STANDBY',
  quickSearch: [],
  typeError : null,
  filterColumn: null,
  columnState: [],
  columnStructure: [],
  editable: true,
  locationsLoaded: null,
  groupColumn: null,
  timeStamp: null,
  oldFileId: null,
  oldUpload: initUpload
};

export function CleansingReducer(
  state: CleansingState = initialState,
  action: CleansingActions
): CleansingState {
  switch (action.type) {
    case CleansingActionTypes.DELETEROW:
      return{
        ...state,
        data: action.payload.row
      };
    case CleansingActionTypes.START_PROCESS:
      return {
        ...state,
        loading: true,
        loaded: false,
        stage: 'STANDBY'
      };

    case CleansingActionTypes.DELETEORUPDATE:
      return {
        ...state,
        deletedOrUpdated: true,
      };

    case CleansingActionTypes.ALLDATA:
      return {
        ...state,
        data: action.payload.data,
      };
    case CleansingActionTypes.CSMETADATA:
      return {
        ...state,
        csMetadata: action.payload.csMetadata
      };
    case CleansingActionTypes.HEADERS:
      return {
        ...state,
        headers: action.payload.headers
      };
    case CleansingActionTypes.JOB_ID:
      return {
        ...state,
        jobId: (action.payload) ? String(action.payload.jobId) : state.jobId
      };

    case CleansingActionTypes.ERRORS:
      return {
        ...state,
        errors: action.payload.errors,
      };
      case CleansingActionTypes.OLD_UPLOAD:
        return {
          ...state,
          oldUpload: action.payload.oldUpload,
        };
    case CleansingActionTypes.ERRORS_TYPE:
      return {
        ...state,
        typeError: action.payload.typeError
      };

    case CleansingActionTypes.ERRORS_COLUMN:
      return {
        ...state,
        filterColumn: action.payload.filterColumn
      };
    
    case CleansingActionTypes.QUICK_SEARCH:
      return {
        ...state,
        quickSearch: action.payload.quickSearch
      };

      case CleansingActionTypes.COLUMN_STATE:
        return {
          ...state,
          columnState: action.payload.columnState
        };
      case CleansingActionTypes.COLUMN_STRUCTURE:
              return {
                ...state,
                columnStructure: action.payload.columnStructure
              };
      case CleansingActionTypes.GROUP_COLUMN:
                    return {
                      ...state,
                      groupColumn: action.payload.groupColumn
                    };
      case CleansingActionTypes.TIMESTAMP:
        return {
          ...state,
          timeStamp: action.payload.timeStamp,
          oldFileId: action.payload.oldFileId
        };
        
        case CleansingActionTypes.FILTER_RESET:
          return {
            ...state,
            quickSearch: null,
            typeError : null,
            filterColumn: null,
          };

        case CleansingActionTypes.UPDATE_OLD_FILE_ID:
        return {
          ...state,
          oldFileId: action.payload.oldFileId
        };
    case CleansingActionTypes.ERRORS_INFO:
      return {
        ...state,
        errorsInfo: action.payload.errorsInfo,
      };

    case CleansingActionTypes.SELECTED_ROWS:
      return {
        ...state,
        selectedRows: action.payload.selectedRows,
      };
      case CleansingActionTypes.EDIT_GRID:
      return {
        ...state,
        selectedRows: action.payload.editable,
      };
      case CleansingActionTypes.LOCATIONS_LOADED:
        return {
          ...state,
          locationsLoaded: action.payload.locationsLoaded,
        };
    case CleansingActionTypes.GO_TO_NEXT:
      return {
        ...state,
        stage: CleansingUtils.getNextCleansingStep(state.stage)
      };

      case CleansingActionTypes.REFRESH_STAGE:
        return {
          ...state,
          stage: 'EDIT'
        };

    case CleansingActionTypes.FINISH_STEP:
      return {
        ...state,
        flowId: (action.payload) ? String(action.payload.flowId) : state.flowId
      };

    case CleansingActionTypes.FINISH_PROCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        stage: 'FINISH'
      };

    case CleansingActionTypes.RESET:
      return {
        ...state,
        filters: {},
        stage: 'STANDBY',
        page: 1,
        limit: 15,
        statistics: {},
        deletedOrUpdated: false,
        flowId: null,
        loading: false,
        loaded: false,
        failed: false,
        selectedRows: [],
        datachek: null,
        data: null,
        errors: null,
        headers: null,
        csMetadata: null,
        jobId: null,
        errorsInfo: null,
        stageBeforeLoad: 'STANDBY',
        quickSearch: [],
        typeError : null,
        filterColumn: null,
        columnState: [],
        columnStructure: [],
        editable: true,
        locationsLoaded: null,
        groupColumn: null,
      };
    default:
      return state;
  }
}
