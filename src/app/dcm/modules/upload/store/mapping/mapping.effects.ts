import { selectImportObjectState } from './../import/import.selectors';
import { MappingService } from './../../services/mapping.service';
import { AppState } from '@app/core';
import { Injectable } from '@angular/core';
import { Action, Store } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { withLatestFrom, map } from 'rxjs/operators';

import { MappingActionTypes, ActionGetMappingData, ActionMappingUpdate, ActionGetMappingDataSuccess, ActionGetMappingDataFailed, ActionGetAllMappings, ActionGetSheetsMapping, ActionGetInitMappings } from './mapping.actions';
import { selectFileData, selectFileSheet } from '../import/import.selectors';
import { forkJoin } from 'rxjs';
import MappingUtils from '../../utils/mapping.utils';
import { selectMappingState } from './mapping.selectors';
import { MappingModel } from './mapping.model';
import MappingRulesUtils from '../../utils/mapping-rules.utils';

export const FORM_KEY = 'DCM.IMPORT';

@Injectable()
export class MappingEffects {
  constructor(
    private actions$: Actions<Action>,
    private store$: Store<AppState>,
    private mappingService: MappingService
  ) {}
 
  @Effect({ dispatch: false })
  startImport = this.actions$.pipe(
    ofType<ActionGetMappingData>(MappingActionTypes.GET_MAPPING_DATA),
    withLatestFrom(this.store$.select( selectImportObjectState )),
    map(([action, importData]) => {
      forkJoin(
        this.mappingService.getTargetFields(importData.selectedSheets),
        this.mappingService.getSourceFields(importData.selectedSheets),
        this.mappingService.getMappingSuggestion(importData.selectedSheets),
        this.mappingService.getMappingId(importData.selectedSheets),
      ).subscribe(([targets, sources , suggestions, fileIds]) => {
    // console.log('===> worksheet : targets, sources, suggestions, mappingIds, suggest ')
    // console.log(targets[0])
    // console.log(sources[0])
    // console.log(suggestions)
    // console.log(fileIds)
        const suggests = [];
        const selectedSheetsF = importData.selectedSheets.allfiles;
        for (let i = 0; i < suggestions.length; i++) {
          const suggestionTemp = suggestions[i];
          const mapping = {};
        const taxonomies = {};
          if (suggestionTemp) {
            suggestionTemp.forEach(element => {
            mapping[element.mapping] = element.taxonomie[0];
            taxonomies[element.mapping] = element.taxonomie;
        });
          
          suggests.push({mapping, taxonomies})
        }
        }
        
    const mappingIds = fileIds.mappingIds;
    const sheetIds = fileIds.sheetIds;
    const mappingId = mappingIds[0]
    
    const sourcesSuggests = [];
    const targetsSuggests = [];
    // const targetsNoItems = [];
    // const SouceNoMappedItems = [];

    for (let i = 0; i < suggests.length; i++) {
      const autoMapping = MappingUtils.processAutomaticMapping(sources[i], targets[i], suggests[i])  
      sourcesSuggests.push(autoMapping.sources);
      targetsSuggests.push(autoMapping.targets);
    // targetsNoItems.push(autoMapping.targetsNoItems);
    // SouceNoMappedItems.push(autoMapping.souceNoMappedItems);
    }

    /* for (let index = 0; index < sourcesSuggests.length; index++) {
      const element = sourcesSuggests[index];
      sourcesSuggests[index].push.apply(sourcesSuggests[index], SouceNoMappedItems[index])
      targetsSuggests[index].push.apply(targetsSuggests[index], targetsNoItems[index])
    } */
    
        const mappings : MappingModel = {
          sources: sourcesSuggests,
          targets: targetsSuggests,
          mappingIds: mappingIds,
          sheetIds: sheetIds,
          suggests: suggests
        }

        const sheets = this.createStructure(selectedSheetsF, mappings);

        this.store$.dispatch(new ActionGetMappingDataSuccess({ target: targetsSuggests[0], source: sourcesSuggests[0], mappingId: mappingId, selectedMapping: 0}))
        this.store$.dispatch(new ActionGetAllMappings({mappings: mappings}));
        this.store$.dispatch(new ActionGetInitMappings({ initMappings: mappings}));
        this.store$.dispatch(new ActionGetSheetsMapping({sheets: sheets}))
        // MappingUtils.processAutomaticMapping(sources, targets, suggests)
        // this.store$.dispatch(new ActionGetMappingDataSuccess({ target: targets, source: sources, mappingId: mappingId }))

       }, err => { this.store$.dispatch( new ActionGetMappingDataFailed())})
    })
  );

  createStructure(files, mappings) {
    let fileSheetsTemp = {};
    let fileSheets = [];
    let index = 0;
    for (const [key1, value1] of Object.entries(files)) {
      for (const [key2, value2] of Object.entries(value1)) {
        let isMissMandatory = true;
        if (mappings && mappings.targets) {
          // isMissMandatory = MappingRulesUtils.isFieldMissMandatory(mappings.targets[index]);
          isMissMandatory = MappingRulesUtils.isMissMandatory(mappings.targets[index]);
          
        }
        fileSheetsTemp = {
          file: this.getFileName(key1),
          sheet: value2,
          extention: this.getFileExtension(key1),
          isMissMandatory: isMissMandatory,
        }
        fileSheets.push(fileSheetsTemp);
        index++;
      }
    }
    return fileSheets;
  }

  public getFileExtension(filename) {
    return filename.split('.').pop();
  }

  public getFileName(filename) {
    return filename.split('.').slice(0, -1).join('.');
  }
}
