import {MappingParamaters} from './../../models/mapping/mapping-paramaters.model';
import {MappingTargetItem} from './../../models/mapping/mapping-target.model';
import {MappingSourceItem} from './../../models/mapping/mapping-source.model';
import {MappingTemplate} from './../../models/mapping/mapping-template.model';

export interface Mapping {
  source: MappingSourceItem[];
  target: MappingTargetItem[];
  mandataryItems: number;
  mandataryItemsInSheet: number;
  isFirstLoad: boolean;
  template: MappingTemplate[];
  mappingParamaters: MappingParamaters,
  filter: string,
  targetFilter: string,
  sourceFilter: string,
  mappingId: string,
  mappings: MappingModel,
  selectedMapping: number,
  sheets: any,
  initMappings: MappingModel 
}

export interface MappingModel {
  sources: /* [MappingSourceItem[]] */ any,
  targets: /* [MappingTargetItem[]] */ any,
  mappingIds: string[],
  sheetIds: string[],
  suggests: any
}

export interface MappingState extends Mapping {
  loading: boolean,
  loaded: boolean,
  failed: boolean
}
