import {AfterViewInit, ChangeDetectorRef, Component, Input, OnInit} from '@angular/core';
import {BehaviorSubject, forkJoin, Observable} from 'rxjs';
import {MappingTemplate} from '@app/dcm/modules/upload/models/mapping/mapping-template.model';
import {MappingTargetItem} from '@app/dcm/modules/upload/models/mapping/mapping-target.model';
import {MappingSourceItem} from '@app/dcm/modules/upload/models/mapping/mapping-source.model';
import {MappingParamaters} from '@app/dcm/modules/upload/models/mapping/mapping-paramaters.model';
import {FileData} from '@app/dcm/modules/upload/store/import/import.model';
import {Store} from '@ngrx/store';
import {AppState} from '@app/core';
import {Router} from '@angular/router';
import {selectFileData, selectImportObjectState} from '@app/dcm/modules/upload/store/import/import.selectors';
import {
  selectMappingfailed,
  selectMappingLoaded, selectMappingLoading, selectMappingParameters,
  selectMappingSource,
  selectMappingTarget,
  selectMappingTemplate,
  selectMappingId,
  selectAllMappings,
  selectSelectedMapping,
  selectMappingTargetFilter,
  selectMappingSourceFilter,
  selectInitMappings
} from '@app/dcm/modules/upload/store/mapping/mapping.selectors';
import {
  ActionGetAllMappings,
  ActionGetMappingData, ActionGetMappingUpdateParameters,
  ActionGetSheetsMapping,
  ActionMappingFilter, ActionMappingTargetFilter, ActionMappingUpdateMandataryItems,
  ActionMappingUpdateMandataryItemsInSheet,
  ActionMappingUpdateOneTarget, ActionMappingUpdateTarget
} from '@app/dcm/modules/upload/store/mapping/mapping.actions';
import {first, take} from 'rxjs/operators';
import MappingRulesUtils from '@app/dcm/modules/upload/utils/mapping-rules.utils';
import MappingUtils from '@app/dcm/modules/upload/utils/mapping.utils';
import { MappingModel } from '../../../store/mapping/mapping.model';
import { MappingContainerComponent } from '../../../containers/mapping-container/mapping-container.component';

@Component({
  selector: 'anms-mapping-home',
  templateUrl: './mapping-home.component.html',
  styleUrls: ['./mapping-home.component.scss']
})
export class MappingHomeComponent implements OnInit, AfterViewInit {
  @Input() selectedSheetMapping = null;

  selectedValue = 'All';
  loading$: Observable<boolean>;
  loaded$: Observable<boolean>;
  failed$: Observable<boolean>;
  initMappings$: Observable<MappingModel>;
  initMappings: MappingModel;

  template$: Observable<MappingTemplate[]>;
  parameters$: Observable<MappingParamaters>;
  source$: Observable<MappingSourceItem[]>;
  target$: Observable<MappingTargetItem[]>;
  mappingId$: Observable<string>;
  targetFileter$: Observable<string>;
  sourceFileter$: Observable<string>;
  mandatoryMissing = 0;
  mandatoryMissingInSheet = 0;
  mappedSources = {};
  fileData$: Observable<FileData>;

  importData$: any;
  mappings$: Observable<MappingModel>;
  mappings: MappingModel;
  selectedMapping$: Observable<number>;
  parameters: MappingParamaters = new MappingParamaters();
  selectedSheets: any;

  selectedMapping: number;
  filteredItems
  targetFilterItems;
  targetFilter = '';
  sourceFilterItems;
  sourceFilter = '';
  targets;
  sources;

  isLoading$: BehaviorSubject<boolean> = new BehaviorSubject(false);

  constructor(private store: Store<AppState>, private router: Router, private cdrf: ChangeDetectorRef, mappingContainer: MappingContainerComponent) {
    this.fileData$ = this.store.select(selectFileData);

    this.importData$ = this.store.select(selectImportObjectState);

    this.source$ = this.store.select(selectMappingSource);
    this.target$ = this.store.select(selectMappingTarget);
    this.template$ = this.store.select(selectMappingTemplate);
    this.parameters$ = this.store.select(selectMappingParameters);
    this.mappings$ = this.store.select(selectAllMappings);
    this.selectedMapping$ = this.store.select(selectSelectedMapping);
    this.targetFileter$ = this.store.select(selectMappingTargetFilter);
    this.sourceFileter$ = this.store.select(selectMappingSourceFilter);
    this.initMappings$ = this.store.select(selectInitMappings);


    this.loading$ = this.store.select(selectMappingLoading);
    this.loaded$ = this.store.select(selectMappingLoaded);
    this.failed$ = this.store.select(selectMappingfailed);

    this.initMappings$.subscribe((data) => {
      if (data) {
        this.initMappings = data;
        // this.initMappings = Object.assign([], data);
      }
    })

    this.importData$.subscribe((importData: any) => {
      if (importData.selectedSheets) {
        this.selectedSheets = importData.selectedSheets['allfiles'];
      }
    })

    this.selectedMapping$.subscribe((selected) => {
      if (selected !== undefined) {
        this.selectedMapping = selected;
      }
})

  mappingContainer.selectedSheetMapping$.subscribe((index: number) => {
    if (index !== undefined) {
      this.selectedMapping = index;
    }
  })

 // To combine with logic below
    // Process params changed
    this.parameters$.subscribe(parameters => {
      this.parameters = {...parameters}
      this.target$.pipe(first(data => data && data.length > 0)).subscribe(targets => {
        const finalList = this.updateTargets(targets)
        this.store.dispatch(new ActionMappingUpdateTarget({target: finalList}))
      })
    })

    this.mappings$.subscribe((mappings: MappingModel) => {
      if (mappings) {
        this.mappings = mappings;
        // Looking for missing target fileds
        let mandatoryMissingTmp = 0;
        // let mandatoryMissingInSheet = 0;
      for (let i = 0; i < this.mappings.targets.length; i++) {
        const targets = this.mappings.targets[i];
        // mandatoryMissingInSheet += MappingRulesUtils.numberMissMandatory(targets);
        mandatoryMissingTmp += (Array.isArray(targets)) ?
        targets.filter(t => t.mappedItems && t.mappedItems.length === 0 && MappingRulesUtils.isFieldMandatoryInit(t, targets) && !t.isDisabled).length : 0

        /* for (let j = 0; j < targets.length; j++) {
          const t = targets[j];
          if (t.mappedItems && t.mappedItems.length === 0 && MappingRulesUtils.isFieldMandatoryInit(t, targets) && !t.isDisabled) {
            mandatoryMissingTmp += 1;
            console.log(t.value)
          }
          console.log(mandatoryMissingTmp)
        } */
      }
      // this.mandatoryMissing = mandatoryMissingTmp;
      // this.store.dispatch(new ActionMappingUpdateMandataryItems({mandataryItems: mandatoryMissingInSheet}))
      this.store.dispatch(new ActionMappingUpdateMandataryItems({mandataryItems: mandatoryMissingTmp}))
      }
    })

    this.target$.subscribe((targets: MappingTargetItem[]) => {
      this.targets = targets;
      let mandatoryMissingTmp = 0;
      this.mandatoryMissingInSheet = MappingRulesUtils.numberMissMandatory(targets);
      mandatoryMissingTmp += (Array.isArray(targets)) ?
        targets.filter(t => t.mappedItems && t.mappedItems.length === 0 && MappingRulesUtils.isFieldMandatoryInit(t, targets) && !t.isDisabled).length : 0
      this.mandatoryMissing = mandatoryMissingTmp;
      // console.log('mandataryItemsInSheet => ')
      // console.log(this.mandatoryMissing)
      this.store.dispatch(new ActionMappingUpdateMandataryItemsInSheet({mandataryItemsInSheet: this.mandatoryMissing, isFirstLoad: false}));
      this.mappedSources = {}
      targets.forEach(t => {
        t.mappedItems.forEach(s => {
          this.mappedSources[s.value] = s
        });
      });
      this.sendTargetFilter();
    })

    this.source$.subscribe((sources: MappingSourceItem[]) => {
      this.sources = sources;
      this.sendSourceFilter();
    })

 /*    this.targetFileter$.subscribe((value: string) => {
      if (value !== undefined)
        this.targetFilter = value;
    });

    this.sourceFileter$.subscribe((sourceFilter: string) => {
      this.sourceFilter = sourceFilter;
    }); */


  }

  onUpdateTarget(target: MappingTargetItem) {
    this.store.dispatch(new ActionMappingUpdateOneTarget({target: target}));
    this.target$.pipe(take(1)).subscribe(targets => {
      const newList = [];
      targets.forEach(t => {
        const ct = MappingUtils.copyTarget(t);

        switch (ct.property) {

          // new conditions
          case 'cleansed_country':
            if (
              MappingRulesUtils.CleansedCountryMapped(targets)
            || MappingRulesUtils.CleansedLongitudeMapped(targets)
            || MappingRulesUtils.CleansedLatitudeMapped(targets)
            || MappingRulesUtils.CleansedIso2Mapped(targets)
            || MappingRulesUtils.CleansedIso3Mapped(targets)
            ) {
              ct.mandatory = true;
            }
          break;
          case 'cleansed_longitude':
            if (
              MappingRulesUtils.CleansedCountryMapped(targets)
            || MappingRulesUtils.CleansedLongitudeMapped(targets)
            || MappingRulesUtils.CleansedLatitudeMapped(targets)
            || MappingRulesUtils.CleansedIso2Mapped(targets)
            || MappingRulesUtils.CleansedIso3Mapped(targets)
            ) {
              ct.mandatory = true;
            }
          break;
          case 'cleansed_latitude':
            if (
              MappingRulesUtils.CleansedCountryMapped(targets)
            || MappingRulesUtils.CleansedLongitudeMapped(targets)
            || MappingRulesUtils.CleansedLatitudeMapped(targets)
            || MappingRulesUtils.CleansedIso2Mapped(targets)
            || MappingRulesUtils.CleansedIso3Mapped(targets)
            ) {
              ct.mandatory = true;
            }
          break;
          
          case 'cleansed_iso2':
            if (
              MappingRulesUtils.CleansedCountryMapped(targets)
            || MappingRulesUtils.CleansedLongitudeMapped(targets)
            || MappingRulesUtils.CleansedLatitudeMapped(targets)
            || MappingRulesUtils.CleansedIso2Mapped(targets)
            || MappingRulesUtils.CleansedIso3Mapped(targets)
            ) {
              ct.mandatory = true;
            }
          break;
          case 'cleansed_iso3':
            if (
              MappingRulesUtils.CleansedCountryMapped(targets)
            || MappingRulesUtils.CleansedLongitudeMapped(targets)
            || MappingRulesUtils.CleansedLatitudeMapped(targets)
            || MappingRulesUtils.CleansedIso2Mapped(targets)
            || MappingRulesUtils.CleansedIso3Mapped(targets)
            ) {
              ct.mandatory = true;
            }
          break;
          
          case 'mpl_pd_value':
            if (MappingRulesUtils.MplpdPercentageMapped(targets)) {
              ct.mandatory = false;
            }
            break;
            case 'mpl_pd_percentage':
              if (MappingRulesUtils.MplpdValueMapped(targets)) {
                ct.mandatory = false;
              }
              break;
              case 'mpl_bi_value':
            if (MappingRulesUtils.MplbiPercentageMapped(targets)) {
              ct.mandatory = false;
            }
            break;
            case 'mpl_bi_percentage':
            if (MappingRulesUtils.MplbiValueMapped(targets)) {
              ct.mandatory = false;
            }
            break;
            case 'tiv_amount':
              if (MappingRulesUtils.PdMapped(targets) || MappingRulesUtils.BiMapped(targets)) {
                ct.mandatory = false;
              }
              break;
          // new conditions

          case 'siteCurrency':
            if (this.parameters.site_currency)
              ct.setMandatoryRules(ct.mandatory, true, true);
            else ct.setMandatoryRules(ct.mandatory, false, false);
            break;
          case 'country':
            if (MappingRulesUtils.LangOrLatMapped(targets))
              ct.setMandatoryRules(false, true, this.parameters.country);
            else ct.setMandatoryRules(ct.mandatory, false, this.parameters.country);
            break;

          case 'latitude':
            if (MappingRulesUtils.LangMapped(targets)) {
              ct.mandatory = true;
            } else if (this.parameters.country || MappingRulesUtils.CountryMapped(targets)) {
              ct.mandatory = false;
            }
            break;
          case 'longitude':
            if (MappingRulesUtils.LatMapped(targets)) {
              ct.mandatory = true;
            } else if (this.parameters.country || MappingRulesUtils.CountryMapped(targets)) {
              ct.mandatory = false;
            }
            break;
          case 'declarationPeriod':
            if (this.parameters.bi_declaration_period) {
              ct.setMandatoryRules(false, true, true);
            } else if (MappingRulesUtils.BiValueMapped(targets)) {
              ct.setMandatoryRules(true, false);
            } else {
              ct.setMandatoryRules(false, true, false);

            }
            break;
          
        }
        newList.push(ct)
      });
      this.store.dispatch(new ActionMappingUpdateTarget({target: newList}))
      const newMappings = this.updateAll(newList);
      const sheets = this.createStructure(this.selectedSheets, newMappings);
      this.store.dispatch(new ActionGetAllMappings({mappings: newMappings}))
      // this.store.dispatch(new ActionGetSheetsMapping({sheets: sheets}))


    })

  }

  onUpdateParameters(parameters: MappingParamaters) {
    this.store.dispatch(new ActionGetMappingUpdateParameters({parameters: parameters}))
    this.updatefields(parameters)
  }

  updatefields(param: MappingParamaters) {
    this.target$.pipe(take(1)).subscribe(targets => {
      const newList = []
      targets.forEach(t => {
        const ct = MappingUtils.copyTarget(t);
        if (param[ct.property]) {
          ct.isDisabled = true;
        }
        if (param[ct.property] == null) {
          ct.isDisabled = false;
        }
        switch (ct.property) {
// new conditions
case 'cleansed_country':
            if (
              MappingRulesUtils.CleansedCountryMapped(targets)
            || MappingRulesUtils.CleansedLongitudeMapped(targets)
            || MappingRulesUtils.CleansedLatitudeMapped(targets)
            || MappingRulesUtils.CleansedIso2Mapped(targets)
            || MappingRulesUtils.CleansedIso3Mapped(targets)
            ) {
              ct.mandatory = true;
            }
          break;
          case 'cleansed_longitude':
            if (
              MappingRulesUtils.CleansedCountryMapped(targets)
            || MappingRulesUtils.CleansedLongitudeMapped(targets)
            || MappingRulesUtils.CleansedLatitudeMapped(targets)
            || MappingRulesUtils.CleansedIso2Mapped(targets)
            || MappingRulesUtils.CleansedIso3Mapped(targets)
            ) {
              ct.mandatory = true;
            }
          break;
          case 'cleansed_latitude':
            if (
              MappingRulesUtils.CleansedCountryMapped(targets)
            || MappingRulesUtils.CleansedLongitudeMapped(targets)
            || MappingRulesUtils.CleansedLatitudeMapped(targets)
            || MappingRulesUtils.CleansedIso2Mapped(targets)
            || MappingRulesUtils.CleansedIso3Mapped(targets)
            ) {
              ct.mandatory = true;
            }
          break;
          
          case 'cleansed_iso2':
            if (
              MappingRulesUtils.CleansedCountryMapped(targets)
            || MappingRulesUtils.CleansedLongitudeMapped(targets)
            || MappingRulesUtils.CleansedLatitudeMapped(targets)
            || MappingRulesUtils.CleansedIso2Mapped(targets)
            || MappingRulesUtils.CleansedIso3Mapped(targets)
            ) {
              ct.mandatory = true;
            }
          break;
          case 'cleansed_iso3':
            if (
              MappingRulesUtils.CleansedCountryMapped(targets)
            || MappingRulesUtils.CleansedLongitudeMapped(targets)
            || MappingRulesUtils.CleansedLatitudeMapped(targets)
            || MappingRulesUtils.CleansedIso2Mapped(targets)
            || MappingRulesUtils.CleansedIso3Mapped(targets)
            ) {
              ct.mandatory = true;
            }
          break;
case 'mpl_pd_value':
  if (MappingRulesUtils.MplpdPercentageMapped(targets)) {
    ct.mandatory = false;
  }
  break;
  case 'mpl_pd_percentage':
    if (MappingRulesUtils.MplpdValueMapped(targets)) {
      ct.mandatory = false;
    }
    break;
    case 'mpl_bi_value':
  if (MappingRulesUtils.MplbiPercentageMapped(targets)) {
    ct.mandatory = false;
  }
  break;
  case 'mpl_bi_percentage':
  if (MappingRulesUtils.MplbiValueMapped(targets)) {
    ct.mandatory = false;
  }
  break;
  case 'tiv_amount':
              if (MappingRulesUtils.PdMapped(targets) || MappingRulesUtils.BiMapped(targets)) {
                ct.mandatory = false;
              }
              break;
// new conditions
          case 'siteCurrency':
            if (param.site_currency)
              ct.setMandatoryRules(ct.mandatory, true, true);
            else ct.setMandatoryRules(ct.mandatory, false, false);
            break;
          case 'country':
            if (MappingRulesUtils.LangOrLatMapped(targets))
              ct.setMandatoryRules(false, true, param.country);
            else ct.setMandatoryRules(ct.mandatory, false, param.country);
            break;

          case 'latitude':
            if (MappingRulesUtils.LangMapped(targets)) {
              ct.mandatory = true;
            } else if (this.parameters.country || MappingRulesUtils.CountryMapped(targets)) {
              ct.mandatory = false;
            }
            break;
          case 'longitude':
            if (MappingRulesUtils.LatMapped(targets)) {
              ct.mandatory = true;
            } else if (this.parameters.country || MappingRulesUtils.CountryMapped(targets)) {
              ct.mandatory = false;
            }
            break;
          case 'declarationPeriod':
            if (param.bi_declaration_period) {
              ct.setMandatoryRules(false, true, true);
            } else if (MappingRulesUtils.BiValueMapped(targets)) {
              ct.setMandatoryRules(true, false);
            } else {
              ct.setMandatoryRules(false, true, false);

            }
            break;
          
        }
        newList.push(ct)
      });

      this.store.dispatch(new ActionMappingUpdateTarget({target: newList}))

    })
  }

  ngAfterViewInit() {
  }

  ngOnInit() {

    forkJoin(
      this.fileData$.pipe(take(1)),
      this.loading$.pipe(take(1)),
      this.loaded$.pipe(take(1))
    ).subscribe(([fileData, loading, loaded]) => {
      if (!loading && !loaded && fileData && fileData.filename) {
        this.store.dispatch(new ActionGetMappingData())
      }
    });

  }

  onDragItemUpdated(dragItem: MappingSourceItem) {
    this.target$.pipe(take(1)).subscribe(targets => {
      const newList = this.updateTargets(targets)
      const newMappings = this.updateAll(newList);
      newList.forEach(t => {
        // Apply Mapping Logic Here
        t.canBeMappedByDragItem = (dragItem && !t.isDisabled && !t.hasSource(dragItem) && t.canAddSource()) ? true : false
      });
      this.store.dispatch(new ActionMappingUpdateTarget({target: newList}))
      this.store.dispatch(new ActionGetAllMappings({mappings: newMappings}))

    })
  }


  updateTargets(targets) {
    const finalList = [];
    targets.forEach(t => {
      const ct = MappingUtils.copyTarget(t)
      switch (ct.property) {
        // new conditions
        case 'cleansed_country':
            if (
              MappingRulesUtils.CleansedCountryMapped(targets)
            || MappingRulesUtils.CleansedLongitudeMapped(targets)
            || MappingRulesUtils.CleansedLatitudeMapped(targets)
            || MappingRulesUtils.CleansedIso2Mapped(targets)
            || MappingRulesUtils.CleansedIso3Mapped(targets)
            ) {
              ct.mandatory = true;
            }
          break;
          case 'cleansed_longitude':
            if (
              MappingRulesUtils.CleansedCountryMapped(targets)
            || MappingRulesUtils.CleansedLongitudeMapped(targets)
            || MappingRulesUtils.CleansedLatitudeMapped(targets)
            || MappingRulesUtils.CleansedIso2Mapped(targets)
            || MappingRulesUtils.CleansedIso3Mapped(targets)
            ) {
              ct.mandatory = true;
            }
          break;
          case 'cleansed_latitude':
            if (
              MappingRulesUtils.CleansedCountryMapped(targets)
            || MappingRulesUtils.CleansedLongitudeMapped(targets)
            || MappingRulesUtils.CleansedLatitudeMapped(targets)
            || MappingRulesUtils.CleansedIso2Mapped(targets)
            || MappingRulesUtils.CleansedIso3Mapped(targets)
            ) {
              ct.mandatory = true;
            }
          break;
          
          case 'cleansed_iso2':
            if (
              MappingRulesUtils.CleansedCountryMapped(targets)
            || MappingRulesUtils.CleansedLongitudeMapped(targets)
            || MappingRulesUtils.CleansedLatitudeMapped(targets)
            || MappingRulesUtils.CleansedIso2Mapped(targets)
            || MappingRulesUtils.CleansedIso3Mapped(targets)
            ) {
              ct.mandatory = true;
            }
          break;
          case 'cleansed_iso3':
            if (
              MappingRulesUtils.CleansedCountryMapped(targets)
            || MappingRulesUtils.CleansedLongitudeMapped(targets)
            || MappingRulesUtils.CleansedLatitudeMapped(targets)
            || MappingRulesUtils.CleansedIso2Mapped(targets)
            || MappingRulesUtils.CleansedIso3Mapped(targets)
            ) {
              ct.mandatory = true;
            }
          break;
        case 'mpl_pd_value':
          if (MappingRulesUtils.MplpdPercentageMapped(targets)) {
            ct.mandatory = false;
          }
          break;
          case 'mpl_pd_percentage':
            if (MappingRulesUtils.MplpdValueMapped(targets)) {
              ct.mandatory = false;
            }
            break;
            case 'mpl_bi_value':
          if (MappingRulesUtils.MplbiPercentageMapped(targets)) {
            ct.mandatory = false;
          }
          break;
          case 'mpl_bi_percentage':
          if (MappingRulesUtils.MplbiValueMapped(targets)) {
            ct.mandatory = false;
          }
          break;
          case 'tiv_amount':
              if (MappingRulesUtils.PdMapped(targets) || MappingRulesUtils.BiMapped(targets)) {
                ct.mandatory = false;
              }
              break;
        // new conditions

        case 'occupancyCode':
          ct.mandatory = false;

          break;
        case 'locationCode':
          ct.mandatory = false;
          break;

        case 'locationName':
          ct.mandatory = true;
          break;
        case 'isAggregation':
          ct.mandatory = false;
          ct.isDisabled = false;
          break;
        case 'constructionCode':
          ct.mandatory = false;
          break;
        case 'siteCurrency':
          if (this.parameters.site_currency) ct.setMandatoryRules(ct.mandatory, true, true);
          else ct.setMandatoryRules(ct.mandatory, false, false);
          break;
        case 'country':
          if (MappingRulesUtils.LangOrLatMapped(targets))
            ct.setMandatoryRules(false, true, this.parameters.country);
          else ct.setMandatoryRules(ct.mandatory, false, this.parameters.country);
          break;

        case 'content':
          if (MappingRulesUtils.pdValueMapped(targets))
            ct.setMandatoryRules(ct.mandatory, !ct.mandatory, true);
          break;
        case 'building':
          if (MappingRulesUtils.pdValueMapped(targets))
            ct.setMandatoryRules(ct.mandatory, !ct.mandatory, true);
          break;
        case 'latitude':
          if (MappingRulesUtils.LangMapped(targets)) {
            ct.mandatory = true;
          } else if (this.parameters.country || MappingRulesUtils.CountryMapped(targets)) {
            ct.mandatory = false;
          }
          break;
        case 'longitude':
          if (MappingRulesUtils.LatMapped(targets)) {
            ct.mandatory = true;
          } else if (this.parameters.country || MappingRulesUtils.CountryMapped(targets)) {
            ct.mandatory = false;
          }
          break;
        case 'declarationPeriod':
          if (this.parameters.bi_declaration_period) {
            ct.setMandatoryRules(false, true, true);
          } else if (MappingRulesUtils.BiValueMapped(targets)) {
            ct.setMandatoryRules(true, false);
          } else {
            ct.setMandatoryRules(false, true, false);

          }
          break;
        /* case 'biValue':
          if (this.parameters.declaration || MappingRulesUtils.ContentValueMapped(targets)) {
            ct.mandatory = true;
          } else {
            ct.mandatory = false;
          }
          break;
        case 'forInterest':
          if (this.parameters.for_interest) {
            ct.mandatory = true;
          } else {
            ct.mandatory = false;
            ct.isDisabled = false;

          }
          break;
        case 'interest':
          if (this.parameters.interest) {
            ct.mandatory = true;
          } else {
            ct.mandatory = false;
            ct.isDisabled = false;
          } */
      }
      finalList.push(ct)
    });
    return finalList;
  }

  resetManualMapping() {
    const isResetAll = false;
    const newMappings = this.initSelectedMapping(isResetAll);
    const newList = this.updateTargets(this.initMappings['targets'][this.selectedMapping])
    console.log('==> newList, newMappings');
    console.log(newList)
    console.log(newMappings)
    if (newList)
      this.store.dispatch(new ActionMappingUpdateTarget({target: newList}))
    if (newMappings)
      this.store.dispatch(new ActionGetAllMappings({mappings: newMappings}))
  }

  resetAllMapping() {
    const isResetAll = true;
    const newList = MappingRulesUtils.resetAllMappings(this.initMappings['targets'][this.selectedMapping])
    const newMappings = this.initSelectedMapping(isResetAll);
      this.store.dispatch(new ActionMappingUpdateTarget({target: newList}))
    if (newMappings)
      this.store.dispatch(new ActionGetAllMappings({mappings: newMappings}))
  }

  initSelectedMapping(isResetAll) {
    let oldTarget = this.mappings.targets;
    let initTarget = this.initMappings.targets;
    const newTarget = [];
    for (let i = 0; i < oldTarget.length; i++) {
      // const elemnt = oldTarget[i];
      const elemnt = initTarget[i];
      if (i === this.selectedMapping) {
        const targetUnMapped = MappingRulesUtils.resetAllMappings(elemnt);
        
        if (isResetAll)
          newTarget[i] = targetUnMapped;
        else
          newTarget[i] = initTarget[i];
      }
      else {
        newTarget[i] = elemnt;
        // newTarget.push(element);
      }
    }
    let newMappings = {
      sources: this.mappings.sources,
      targets: newTarget,
      mappingIds: this.mappings.mappingIds,
      sheetIds: this.mappings.sheetIds,
      suggests: this.mappings.suggests
    }
    return newMappings;
  }

  updateAll(target) {
    let oldTarget = this.mappings.targets;
    const newTarget = [];
    for (let i = 0; i < oldTarget.length; i++) {
      const element = oldTarget[i];
      if (i === this.selectedMapping) {
        newTarget[i] = target;
      }
      else {
        newTarget[i] = element;
        // newTarget.push(element);
      }
    }
    let newMappings = {
      sources: this.mappings.sources,
      targets: newTarget,
      mappingIds: this.mappings.mappingIds,
      sheetIds: this.mappings.sheetIds,
      suggests: this.mappings.suggests
    }
    return newMappings;
  }

  sendFilter() {
    this.store.dispatch(new ActionMappingFilter({filter: this.selectedValue}))
  }

  sendTargetFilter() {
    this.filterTargetItem(this.targetFilter);
    // this.store.dispatch(new ActionMappingTargetFilter({targetFilter: value}))
    // this.store.dispatch(new ActionMappingUpdateTarget({target: newList}))
    // this.store.dispatch(new ActionGetAllMappings({mappings: newMappings}))
  }

  sendSourceFilter() {
    this.filterSourceItem(this.sourceFilter);
    // this.store.dispatch(new ActionMappingTargetFilter({targetFilter: value}))
    // this.store.dispatch(new ActionMappingUpdateTarget({target: newList}))
    // this.store.dispatch(new ActionGetAllMappings({mappings: newMappings}))
  }

  assignTCopy(){
    this.filteredItems = Object.assign([], this.targets);
 }
 filterTargetItem(value){
    if(!value || value=== undefined || value === ''){
        this.assignTCopy();
    } // when nothing has typed
    this.targetFilterItems = Object.assign([], this.targets).filter(
       item => item.viewValue.toLowerCase().indexOf(value.toLowerCase()) > -1
    )
 }

 assignSCopy(){
  this.sourceFilterItems = Object.assign([], this.sources);
}
filterSourceItem(value){
  if(!value || value=== undefined || value === ''){
      this.assignSCopy();
  } // when nothing has typed
  this.sourceFilterItems = Object.assign([], this.sources).filter(
     item => item.viewValue.toLowerCase().indexOf(value.toLowerCase()) > -1
  )
}

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

