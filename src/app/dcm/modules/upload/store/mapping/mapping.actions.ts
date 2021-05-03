import {MappingParamaters} from './../../models/mapping/mapping-paramaters.model';
import {MappingTargetItem} from './../../models/mapping/mapping-target.model';
import {MappingSourceItem} from './../../models/mapping/mapping-source.model';
import {Action} from '@ngrx/store';
import {Mapping, MappingModel} from './mapping.model';
import {MappingTemplate} from '../../models/mapping/mapping-template.model';

export enum MappingActionTypes {
  UPDATE = '[Mapping] Update',
  UPDATE_SOURCE = '[Mapping] Update Source Fields',
  UPDATE_TARGET = '[Mapping] Update Target Fields',
  UPDATE_ONE_TARGET = '[Mapping] Update one Target Field',
  UPDATE_TEMPLATE = '[Mapping] Update Template',
  UPDATE_PARAMETERS = '[Mapping] Update Parameters',
  UPDATE_MANDATARY_ITEMS = '[Mapping] Update mandatary items',
  GET_MAPPING_DATA = '[Mapping] Get mapping data',
  GET_MAPPING_DATA_SUCCESS = '[Mapping] Get mapping data success',
  GET_MAPPING_DATA_FAILED = '[Mapping] Get mapping data failed',
  RESET = '[Mapping] Reset',
  FILTER = '[Mapping] Filter',
  TARGET_FILTER = '[Mapping] Target Filter',
  SOURCE_FILTER = '[Mapping] Source Filter',
  MAPPINGS = '[Mapping] upload all mappings',
  INIT_MAPPINGS = '[Mapping] upload initial mappings',
  SELECTED_MAPPING = '[Mapping] get selected mappings',
  UPDATE_MANDATARY_ITEMS_IN_SHEET = '[Mapping] Update mandatary items in sheet',
  SELECTED_SHEETS_MAPPING = '[Mapping] get sheets mappings',
  MAPPING_ID = '[Mapping] get mappings ids'
}

export class ActionMappingUpdate implements Action {
  readonly type = MappingActionTypes.UPDATE;

  constructor(readonly payload: { source: MappingSourceItem[], target: MappingTargetItem[] }) {
  }
}

export class ActionMappingUpdateTarget implements Action {
  readonly type = MappingActionTypes.UPDATE_TARGET;

  constructor(readonly payload: { target: MappingTargetItem[] }) {
  }
}

export class ActionMappingFilter implements Action {
  readonly type = MappingActionTypes.FILTER;

  constructor(readonly payload: { filter: string }) {
  }
}

export class ActionMappingTargetFilter implements Action {
  readonly type = MappingActionTypes.TARGET_FILTER;

  constructor(readonly payload: { targetFilter: string }) {
  }
}

export class ActionMappingSourceFilter implements Action {
  readonly type = MappingActionTypes.SOURCE_FILTER;

  constructor(readonly payload: { sourceFilter: string }) {
  }
}

export class ActionMappingUpdateMandataryItems implements Action {
  readonly type = MappingActionTypes.UPDATE_MANDATARY_ITEMS;

  constructor(readonly payload: { mandataryItems: number }) {
  }
}

export class ActionMappingUpdateMandataryItemsInSheet implements Action {
  readonly type = MappingActionTypes.UPDATE_MANDATARY_ITEMS_IN_SHEET;

  constructor(readonly payload: { mandataryItemsInSheet: number, isFirstLoad: boolean }) {
  }
}

export class ActionMappingUpdateOneTarget implements Action {
  readonly type = MappingActionTypes.UPDATE_ONE_TARGET;

  constructor(readonly payload: { target: MappingTargetItem }) {
  }
}

export class ActionMappingUpdateSource implements Action {
  readonly type = MappingActionTypes.UPDATE_SOURCE;

  constructor(readonly payload: { source: MappingSourceItem[] }) {
  }
}

export class ActionMappingUpdateTemplate implements Action {
  readonly type = MappingActionTypes.UPDATE_TEMPLATE;

  constructor(readonly payload: { template: MappingTemplate[]}) {
  }
}

export class ActionGetMappingUpdateParameters implements Action {
  readonly type = MappingActionTypes.UPDATE_PARAMETERS;

  constructor(readonly payload: { parameters: MappingParamaters }) {
  }
}

export class ActionGetMappingData implements Action {
  readonly type = MappingActionTypes.GET_MAPPING_DATA;
}

export class ActionGetMappingDataSuccess implements Action {
  readonly type = MappingActionTypes.GET_MAPPING_DATA_SUCCESS;

  constructor(readonly payload: { source: MappingSourceItem[], target: MappingTargetItem[], mappingId: string, selectedMapping: number}) {
  }
}


export class ActionGetMappingDataFailed implements Action {
  readonly type = MappingActionTypes.GET_MAPPING_DATA_FAILED;
}

export class ActionMappingReset implements Action {
  readonly type = MappingActionTypes.RESET;
}

export class ActionGetAllMappings implements Action {
  readonly type = MappingActionTypes.MAPPINGS;
  constructor(readonly payload: { mappings: MappingModel }) {
  }
}

export class ActionGetInitMappings implements Action {
  readonly type = MappingActionTypes.INIT_MAPPINGS;
  constructor(readonly payload: { initMappings: MappingModel }) {
  }
}

export class ActionGetSelectedMapping implements Action {
  readonly type = MappingActionTypes.SELECTED_MAPPING;
  constructor(readonly payload: { selectedMapping: number }) {
  }
}

export class ActionGetSheetsMapping implements Action {
  readonly type = MappingActionTypes.SELECTED_SHEETS_MAPPING;
  constructor(readonly payload: { sheets: any }) {
  }
}

export class ActionGetMappingId implements Action {
  readonly type = MappingActionTypes.MAPPING_ID;
  constructor(readonly payload: { mappingId: any }) {
  }
}

export type MappingActions =
  ActionMappingUpdate
  | ActionMappingUpdateTarget
  | ActionMappingUpdateOneTarget
  | ActionMappingUpdateSource
  | ActionMappingUpdateTemplate
  | ActionGetMappingUpdateParameters
  | ActionGetMappingData
  | ActionGetMappingDataSuccess
  | ActionGetMappingDataFailed
  | ActionMappingReset
  | ActionMappingUpdateMandataryItems
  | ActionMappingFilter
  | ActionGetAllMappings
  | ActionGetSelectedMapping
  | ActionMappingTargetFilter
  | ActionMappingSourceFilter
  | ActionMappingUpdateMandataryItemsInSheet
  | ActionGetSheetsMapping
  | ActionGetMappingId
  | ActionGetInitMappings;
