import {Import, ImportState} from './import.model';
import {ImportActions, ImportActionTypes} from './import.actions';

export const initialState: ImportState = {
  import: {
    imported: false,
    importing: false,
    selectedFile: null,
    fileData: null,
    progress: null,
    selectedSheet: null,
    data: null,
    fileModel: null
  } as Import
};

export function ImportReducer(
  state: ImportState = initialState,
  action: ImportActions
): ImportState {
  switch (action.type) {
    case ImportActionTypes.UPDATE:
      return {
        ...state,
        import: {
          ...state.import,
          progress: action.payload.progress
        }
      };
    case ImportActionTypes.IMPORTED_DATA:
      return {
        ...state,
        import: {
          ...state.import,
          data: action.payload.data
        }
      };
    case ImportActionTypes.RESET:
      return initialState;

    case ImportActionTypes.START_IMPORT:
      return {
        ...state,
        import: {
          ...state.import,
          importing: true,
          imported: false,
        }
      };

      case ImportActionTypes.FINISH_IMPORT:
      return {
        ...state,
        import: {
          ...state.import,
          importing: false,
          imported: true,
          workFiles: action.payload.workfiles,
          importMetadata: action.payload.importMetadata,
          fileData: {
            filename: action.payload.file['filename'],
            fileId: action.payload.file['file_id'],
            worksheetId: action.payload.file['worksheets_map'],
            filetype: action.payload.file['filetype'],
            page: null,
            worksheet: action.payload.worksheets,
            totalRows: null,
            nrows: null,
            lobId: null,
            isExcel: action.payload.file['excel'],
            document: action.payload.file
          }
        }
      };

      case ImportActionTypes.UPDATE_FILE_ID:
      return {
        ...state,
        import: {
          ...state.import,
          importing: false,
          imported: true,
          fileData: {
            ...state.import.fileData,
            fileId: action.payload.fileId
          }
        }
      };

    case ImportActionTypes.CANCEL_IMPORT:
      return {
        ...state,
        import: {
          ...state.import,
          importing: false,
          imported: false,
          progress: null,
          selectedFile: null,
          selectedSheet: null,
          fileModel: null
        }
      };

      case ImportActionTypes.UPLOAD_FILES:
            return {
              ...state,
              import: {
                ...state.import,
                files: action.payload.file,
                importing: false,
                imported: false,
                // ##start
                progress: action.payload.file[0].size
              }
            };

    case ImportActionTypes.UPDATE_FILE_DATA:
      return {
        ...state,
        import: {
          ...state.import,
          selectedSheet: 0,
          fileData: {
            ...state.import.fileData,
            ...action.payload.fileData
          }
        }
      };

      case ImportActionTypes.UPDATE_WORK_FILES:
        return {
          ...state,
          import: {
            ...state.import,
            workFiles: action.payload.workFiles,
            selectedSheets: action.payload.sheetsModel
          }
        };

    case ImportActionTypes.SELECT_SHEET:
      return {
        ...state,
        import: {
          ...state.import,
          selectedSheet: action.payload.sheetIndex
        }
      };

      case ImportActionTypes.SELECT_SHEETS:
        return {
          ...state,
          import: {
            ...state.import,
            selectedSheets: action.payload.sheetsModel
          }
        };

      case ImportActionTypes.SELECT_FILE:
        return {
          ...state,
          import: {
            ...state.import,
            selectedFile: action.payload.file
          }
        };

    default:
      return state;
  }
}
