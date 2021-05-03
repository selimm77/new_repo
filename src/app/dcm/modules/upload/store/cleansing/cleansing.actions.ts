import {Action} from '@ngrx/store';
import { UploadData } from './cleansing.model';

export enum CleansingActionTypes {
  START_PROCESS = '[Cleansing] Start process',
  DELETEORUPDATE = '[Cleansing] Delete update row',
  DELETEROW = '[Cleansing] deleterow',
  GO_TO_NEXT = '[Cleansing] Go to next',
  REFRESH_STAGE = '[Cleansing] refresh stage',
  FINISH_STEP = '[Cleansing] Finish current',
  FINISH_PROCESS = '[Cleansing] Finish process',
  RESET = '[Cleansing] Reset',
  ALLDATA = '[Cleansing] All data',
  ERRORS = '[Cleansing] Errors',
  ERRORS_INFO = '[Cleansing] Errors Info',
  SELECTED_ROWS = '[Cleansing] Selected rows',
  CSMETADATA = '[Cleansing] Cs Metadata',
  JOB_ID = '[Cleansing] Job Id',
  HEADERS = '[Cleansing] Headers',
  ERRORS_TYPE = '[Cleansing] Filter errors by Type',
  ERRORS_COLUMN = '[Cleansing] Filter errors by Column',
  QUICK_SEARCH = '[Cleansing] Filter Quick Search',
  COLUMN_STATE = '[Cleansing] Column state',
  COLUMN_STRUCTURE = '[Cleansing] Column structure',
  EDIT_GRID = '[Cleansing] Edit the grid',
  LOCATIONS_LOADED = '[Cleansing] Locations loaded',
  UPDATE_ALL = '[Cleansing] update all data',
  GROUP_COLUMN = '[Cleansing] group column state',
  TIMESTAMP = '[Cleansing] timestap before upload',
  UPDATE_OLD_FILE_ID = '[Cleansing] update old file id',
  FILTER_RESET = '[Cleansing] reset filter',
  OLD_UPLOAD = '[Cleansing] get old upload'

}


export class ActionCleansingStart implements Action {
  readonly type = CleansingActionTypes.START_PROCESS;
}

export class ActionDeleteRow implements Action {
  readonly type = CleansingActionTypes.DELETEROW;
  constructor(readonly payload: { row: any }) {
  }
}

export class ActionCleansingDeleteOrUpdate implements Action {
  readonly type = CleansingActionTypes.DELETEORUPDATE;

  constructor(readonly payload: { deletedOrUpdated: boolean }) {
  }
}

export class ActionLoadAllData implements Action {
  readonly type = CleansingActionTypes.ALLDATA;

  constructor(readonly payload: { data: any }) {
  }
}

export class ActionLoadErrors implements Action {
  readonly type = CleansingActionTypes.ERRORS;

  constructor(readonly payload: { errors: any }) {
  }
}

export class ActionLoadErrorsInfo implements Action {
  readonly type = CleansingActionTypes.ERRORS_INFO;

  constructor(readonly payload: { errorsInfo: any }) {
  }
}

export class ActionCleansingNextStep implements Action {
  readonly type = CleansingActionTypes.GO_TO_NEXT;
}

export class ActionCleansingRefreshStage implements Action {
  readonly type = CleansingActionTypes.REFRESH_STAGE;
}

export class ActionCleansingFinishCurrent implements Action {
  readonly type = CleansingActionTypes.FINISH_STEP;

  constructor(readonly payload?: { flowId: number }) {
  }
}

export class ActionLoadJobId implements Action {
  readonly type = CleansingActionTypes.JOB_ID;

  constructor(readonly payload?: { jobId: any }) {
  }
}

export class ActionCleansingFinish implements Action {
  readonly type = CleansingActionTypes.FINISH_PROCESS;
}

export class ActionCleansingReset implements Action {
  readonly type = CleansingActionTypes.RESET;
}

export class ActionSelectedRows implements Action {
  readonly type = CleansingActionTypes.SELECTED_ROWS;

  constructor(readonly payload?: { selectedRows: any[] }) {
  }
}

export class ActionLoadCsMetadata implements Action {
  readonly type = CleansingActionTypes.CSMETADATA;

  constructor(readonly payload: { csMetadata: any }) {
  }
}

export class ActionLoadHeaders implements Action {
  readonly type = CleansingActionTypes.HEADERS;
  constructor(readonly payload: { headers: any }) {
  }
}

export class ActionFilterErrorsByType implements Action {
  readonly type = CleansingActionTypes.ERRORS_TYPE;
  constructor(readonly payload: { typeError: any}) {
  }
}

export class ActionColumnState implements Action {
  readonly type = CleansingActionTypes.COLUMN_STATE;
  constructor(readonly payload: { columnState: any[] }) {
  }
}

export class ActionColumnStructure implements Action {
  readonly type = CleansingActionTypes.COLUMN_STRUCTURE;
  constructor(readonly payload: { columnStructure: any[] }) {
  }
}

export class ActionFilterErrorsByColumn implements Action {
  readonly type = CleansingActionTypes.ERRORS_COLUMN;
  constructor(readonly payload: { filterColumn: any }) {
  }
}
export class ActionFilterQuickSearch implements Action {
  readonly type = CleansingActionTypes.QUICK_SEARCH;
  constructor(readonly payload: { quickSearch: any }) {
  }
}

export class ActionEditGrid implements Action {
  readonly type = CleansingActionTypes.EDIT_GRID;
  constructor(readonly payload: { editable: any }) {
  }
}

export class ActionLoadAllLocations implements Action {
  readonly type = CleansingActionTypes.LOCATIONS_LOADED;
  constructor(readonly payload: { locationsLoaded: any }) {
  }
}

export class ActionCleansingUpdateAll implements Action {
  readonly type = CleansingActionTypes.UPDATE_ALL;

  constructor(readonly payload: { csMetadata: any, errors: any, data: any }) {
  }
}

export class ActionDisplayedGroupColumn implements Action {
  readonly type = CleansingActionTypes.GROUP_COLUMN;

  constructor(readonly payload: { groupColumn: any }) {
  }
}

export class ActionGetTimeStamp implements Action {
  readonly type = CleansingActionTypes.TIMESTAMP;

  constructor(readonly payload: { timeStamp: any, oldFileId: string }) {
  }
}

export class ActionUpdateOldFileId implements Action {
  readonly type = CleansingActionTypes.UPDATE_OLD_FILE_ID;

  constructor(readonly payload: { oldFileId: string }) {
  }
}

export class ActionQuicksearchReset implements Action {
  readonly type = CleansingActionTypes.FILTER_RESET;
  
  // constructor(readonly payload: { quickSearch: any }) {}
}

export class ActionGetOldUpload implements Action {
  readonly type = CleansingActionTypes.OLD_UPLOAD;
  
  constructor(readonly payload: { oldUpload: UploadData }) {}
}

export type CleansingActions =
  ActionCleansingStart
  | ActionCleansingNextStep
  | ActionCleansingFinishCurrent
  | ActionCleansingFinish
  | ActionCleansingDeleteOrUpdate
  | ActionLoadAllData
  | ActionLoadErrors
  | ActionLoadErrorsInfo
  | ActionDeleteRow
  | ActionSelectedRows
  | ActionCleansingReset
  | ActionLoadCsMetadata
  | ActionLoadHeaders
  | ActionLoadJobId
  | ActionFilterErrorsByType
  | ActionFilterErrorsByColumn
  | ActionFilterQuickSearch
  | ActionColumnState
  | ActionColumnStructure
  | ActionEditGrid
  | ActionLoadAllLocations
  | ActionCleansingUpdateAll
  | ActionCleansingRefreshStage
  | ActionDisplayedGroupColumn
  | ActionGetTimeStamp
  | ActionUpdateOldFileId
  | ActionQuicksearchReset
  | ActionGetOldUpload;
