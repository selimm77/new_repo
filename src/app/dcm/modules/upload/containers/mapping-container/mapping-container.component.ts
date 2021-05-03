import {ChangeDetectionStrategy, Component, OnInit, ChangeDetectorRef} from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { SheetModel } from '../../store/import/import.model';
import { MappingModel } from '../../store/mapping/mapping.model';
import {Store} from '@ngrx/store';
import {AppState} from '@app/core';
import { selectImportObjectState } from '../../store/import/import.selectors';
import { selectAllMappings, selectisMandataryItemsInSheetMapping, selectMandataryItemsInSheetMapping, selectMappingTarget, selectSheetsMapping } from '../../store/mapping/mapping.selectors';
import { ActionGetAllMappings, ActionGetMappingDataSuccess, ActionMappingReset, ActionGetSelectedMapping, ActionMappingUpdateSource, ActionMappingUpdateTarget } from '../../store/mapping/mapping.actions';
import MappingUtils from '../../utils/mapping.utils';
import {ViewEncapsulation} from '@angular/core';
import MappingRulesUtils from '../../utils/mapping-rules.utils';
import { MappingTargetItem } from '../../models/mapping/mapping-target.model';

@Component({
  selector: 'anms-mapping-container',
  templateUrl: './mapping-container.component.html',
  styleUrls: ['./mapping-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class MappingContainerComponent implements OnInit {

  sheets: any;
  importData$: any;
  mappings$: Observable<MappingModel>;
  target$: Observable<MappingTargetItem[]>;
  mandataryItemsInSheet$: Observable<number>;
  isMandataryItemsInSheet$: Observable<boolean>;
  sheets$: Observable<any>;
  mandataryItemsInSheet: number;
  mappings: MappingModel;
  selectedSheets;
  targets: MappingTargetItem[];
  isMissMandatory: boolean = true;
  isFirstLoad: boolean = true;
  selectedSheetMapping$: BehaviorSubject<number> = new BehaviorSubject(0);
  selectedSheetIndex: number = 0;
  isMandatoryStructure: any = [true, true];
  firstLoadMapping: boolean = true;

  constructor(private store: Store<AppState>, private cdrf: ChangeDetectorRef) {
    this.target$ = this.store.select(selectMappingTarget);
    this.mandataryItemsInSheet$ = this.store.select(selectMandataryItemsInSheetMapping);
    this.isMandataryItemsInSheet$ = this.store.select(selectisMandataryItemsInSheetMapping);
    this.importData$ = this.store.select(selectImportObjectState);
    this.mappings$ = this.store.select(selectAllMappings);
    this.sheets$ = this.store.select(selectSheetsMapping);

    this.isMandataryItemsInSheet$.subscribe((data) => {
      this.isFirstLoad = data;
    })

    this.mandataryItemsInSheet$.subscribe((data) => {
      if (data !== undefined) {
        if (data > 0) {
          this.isMissMandatory = true;
        }
        else {
          this.isMissMandatory = false;
        }
      }
    })

    this.mappings$.subscribe((mappings: MappingModel) => {
        if (mappings !== undefined) {
        this.mappings = mappings;
          if(mappings && mappings.targets && this.firstLoadMapping) {
            this.sheets = this.createStructure(this.selectedSheets['allfiles'], this.mappings);
            this.firstLoadMapping = false;
          }
      }
    })

    this.sheets$.subscribe((sheets: any) => {
      if (sheets !== undefined) {
      this.sheets = sheets;
    }
  })

    this.importData$.subscribe((importData: any) => {
        if (importData.selectedSheets) {
        this.selectedSheets = importData.selectedSheets;
        this.sheets = this.createStructure(this.selectedSheets['allfiles'], this.mappings);
      }
    })

    this.target$.subscribe((targets) => {
      if (targets) {
        this.targets = targets;
        this.isMissMandatory = MappingRulesUtils.isMissMandatory(targets);
        // this.sheets = this.createStructure(this.selectedSheets['allfiles'], this.mappings);
        this.isMandatoryStructure[this.selectedSheetIndex] =  this.isMissMandatory;
      }
    })
  }

  ngOnInit(): void {
    this.importData$.subscribe((importData: any) => {
      if (importData.selectedSheets) {
        this.selectedSheets = importData.selectedSheets;
        /* if (this.isFirstLoad) {
          this.sheets = this.createStructure(this.selectedSheets['allfiles'], this.mappings);
        }   */
      }
    })
  }

  setColorIntoIconIfMissMandatory(index) {
    return this.isMandatoryStructure[index];
  }

  tabChanged(index) {
    // console.log('tabChanged index:');
    // console.log(index);
    if (index !== undefined) {
      const mappingId = this.mappings.mappingIds[index];
      const sheetId = this.mappings.sheetIds[index];
      const source = this.mappings.sources[index];
      const target = this.mappings.targets[index];
      const suggest = this.mappings.suggests[index];

      this.selectedSheetMapping$.next(index);
      this.selectedSheetIndex = index;

      // this.store.dispatch(new ActionGetAllMappings({mappings: this.mappings}))
      this.sheets = this.createStructure(this.selectedSheets['allfiles'], this.mappings);
      // update data
      this.store.dispatch(new ActionGetMappingDataSuccess({ target: target, source: source, mappingId: mappingId, selectedMapping: index}));
      // update selected mapping
      // this.store.dispatch(new ActionGetSelectedMapping({selectedMapping: index}));
      // // update source
      // this.store.dispatch(new ActionMappingUpdateSource({source: source}));
      // // update target
      // this.store.dispatch(new ActionMappingUpdateTarget({target: target}));
    }
  }

  createStructure(files, mappings) {
    let fileSheetsTemp = {};
    let fileSheets = [];
    
    // this.sheets = importData.selectedSheets;
    let index = 0;
    for (const [key1, value1] of Object.entries(files)) {
      for (const [key2, value2] of Object.entries(value1)) {
        let isMissMandatory = true;
        let mandatoryMissingTmp = 0;
        let mandatoryMissingInSheet = 0;

        if (mappings && mappings.targets) {
          const targets = mappings.targets[index];
          // mandatoryMissingInSheet = MappingRulesUtils.numberMissMandatory(targets);
          mandatoryMissingInSheet = MappingRulesUtils.missMandatory(targets);
          // isMissMandatory = MappingRulesUtils.isFieldMissMandatory(mappings.targets[index]);
          /* debut ### */
          // isMissMandatory = MappingRulesUtils.isMissMandatory(mappings.targets[index]);
          mandatoryMissingTmp += (Array.isArray(targets)) ?
        targets.filter(t => t.mappedItems && t.mappedItems.length === 0 && MappingRulesUtils.isFieldMandatoryInit(t, targets) && !t.isDisabled).length : 0
      
        }

        if (mandatoryMissingTmp > 0 /* || mandatoryMissingInSheet > 0 */) {
          this.isMandatoryStructure[index] = true;
          isMissMandatory = true;
        }
        else {
          this.isMandatoryStructure[index] = false;
          isMissMandatory = false;
        }
        // this.isMandatoryStructure[index] = isMissMandatory;
        /* fin ### */
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
    // console.log(this.isMandatoryStructure)
    // console.log(fileSheets)
    return fileSheets;
  }

  public getFileExtension(filename) {
    return filename.split('.').pop();
  }

  public getFileName(filename) {
    return filename.split('.').slice(0, -1).join('.');
  }

}
