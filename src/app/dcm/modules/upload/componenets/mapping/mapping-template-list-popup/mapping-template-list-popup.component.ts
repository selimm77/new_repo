
import { Component, OnInit, ChangeDetectionStrategy, ViewChild, ChangeDetectorRef } from '@angular/core';
import { MappingTemplateViewModel, MappingTemplate } from '../../../models/mapping/mapping-template.model';
import { MatSort, MatTableDataSource } from '@angular/material';
import { Observable, forkJoin } from 'rxjs';
import { MappingTargetItem } from '../../../models/mapping/mapping-target.model';
import { Store } from '@ngrx/store';
import { AppState, NotificationService } from '@app/core';
import { MappingService } from '../../../services/mapping.service';
import { selectToken } from '../../../store/import/import.selectors';
import {
  selectMappingTemplate,
  selectMappingTarget,
  selectMappingSource
} from '../../../store/mapping/mapping.selectors';
import { map, take } from 'rxjs/operators';
import { MappingSourceItem, MappingSourceItemTuple } from '@app/dcm/modules/upload/models/mapping/mapping-source.model';
import { ifError } from 'assert';
import { element } from 'protractor';
import { ActionMappingUpdateTarget, ActionGetMappingUpdateParameters } from '@app/dcm/modules/upload/store/mapping/mapping.actions';
import MappingUtils from '@app/dcm/modules/upload/utils/mapping.utils';
import { MappingParamaters } from '../../../models/mapping/mapping-paramaters.model';
import MappingRulesUtils from '../../../utils/mapping-rules.utils';

@Component({
  selector: 'anms-mapping-template-list-popup',
  templateUrl: './mapping-template-list-popup.component.html',
  styleUrls: ['./mapping-template-list-popup.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MappingTemplateListPopupComponent implements OnInit {

  @ViewChild(MatSort) sort: MatSort;

  token$: Observable<string>
  currentTemplate$: Observable<MappingTemplate[]>
  targets$: Observable<MappingTargetItem[]>
  source$: Observable<MappingSourceItem[]>
  parameters: MappingParamaters = new MappingParamaters();

  cols: any[];
  dataSource = [];
  selecteddata: any;
  loading: boolean;

  private headers = ['Location Name', 'Country', 'State', 'County', 'City', 'Zip Code', 'Street', 'Longitude', 'Latitude', 'BI Type', 'BI Value', 'Interest', 'Occupancy Source', 'Occupancy Code', 'Construction Source', 'Construction Code', 'Year Built', 'Largest Unit Capacity', 'External Reference'];
  public templatesLoaded = [];
  constructor(
    private store: Store<AppState>,
    private mappingService: MappingService,
    private notifService: NotificationService,
    private cdrf: ChangeDetectorRef
  ) {
    this.token$ = this.store.select(selectToken);
    this.currentTemplate$ = this.store.select(selectMappingTemplate);
    this.currentTemplate$.subscribe(data => {
    }
      , () => {
      }, () => {
        this.cdrf.detectChanges();
      });
    this.targets$ = this.store.select(selectMappingTarget);
    this.source$ = this.store.select(selectMappingSource);
  }

  getTarget(idMappings: any, mappings: any): any {
    let dataTemp: any;
    let returneddata = [];
    this.targets$.forEach((item: MappingTargetItem[]) => {
      item.forEach(data => {
        if (idMappings.includes(data.value.toString())) {
          dataTemp = this.getMappingTarget(data, mappings, data.value.toString(), true);
        }
        else {
          dataTemp = this.getMappingTarget(data, mappings, data.value.toString(), false);
        }
        returneddata = [...returneddata, dataTemp];
      })
    })
    return returneddata;
  }

  getMappingTarget(data, mappings, id, mapped) {
    const newTargets = {};
    for (const [key, value] of Object.entries(data)) {
      if (key === 'mappable') {
        newTargets[key] = mapped;
      }
      if (mapped) {
        if (key === 'mappedItems') {
          const mappedItemsTemp = [];
          for (let i = 0; i < mappings[id].length; i++) {
            mappedItemsTemp.push({
              value: mappings[id][0],
              viewValue: mappings[id][i]
              // value: mappings[id][0],
            })
          }
          newTargets[key] = mappedItemsTemp;
        }
        else {
          newTargets[key] = value;
        }
      }
      else {
        if (key === 'mappedItems') {
          newTargets[key] = [];
        }
        else {
          newTargets[key] = value;
        }
      }
    }
    return newTargets;
  }

  getsource(value: string): MappingSourceItem {
    let returneddata: MappingSourceItem;
    this.source$.forEach((item: MappingSourceItem[]) => {
      item.forEach(data => {
        if (data.value.toString() === value) {
          returneddata = data;
        }
      })
    })
    return returneddata;
  }

  selectdata() {
    const mappings = {};
    const headers = [];
    const idMappings = [];
    let parameters;

    this.mappingService.getMappingItem(this.selecteddata.name, null).subscribe((t: any) => {
      t.mapping.forEach(e => {
        parameters = t.top_panel;
        mappings[e.target] = e.source;
        if (!idMappings.includes(e.target)) {
          idMappings.push(e.target);
        }
        if (!headers.includes(e.source[0])) {
          headers.push(e.source[0]);
        }
      })

      this.parameters = parameters;
      const d = this.getTarget(idMappings, mappings);

      this.store.dispatch(new ActionGetMappingUpdateParameters({ parameters: parameters }))
      this.store.dispatch(new ActionMappingUpdateTarget({ target: d }));
      this.targets$ = this.store.select(selectMappingTarget);
      this.updatefields(parameters)
    });
  }


  updatefields(param: MappingParamaters) {
    this.targets$.pipe(take(1)).subscribe(targets => {
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
          case 'biValue':
            if (param.declaration || MappingRulesUtils.ContentValueMapped(targets)) {
              ct.mandatory = true;
            } else {
              ct.mandatory = false;
            }
            break;
          case 'forInterest':
            if (param.for_interest) {
              ct.mandatory = true;
            } else {
              ct.mandatory = false;
              ct.isDisabled = false;

            }
            break;
          case 'interest':
            if (param.interest) {
              ct.mandatory = true;
            } else {
              ct.mandatory = false;
              ct.isDisabled = false;
            }
        }
        newList.push(ct)
      });
      this.store.dispatch(new ActionMappingUpdateTarget({ target: newList }))

    })
  }

  createId(name) {
    const dt = new Date();
    return name.split(' ').join('_') + dt.getFullYear() + dt.getMonth() + dt.getDay() + dt.getTime();
  }

  ngOnInit() {

    this.cols = [
      { field: 'name', header: 'Name' },
      { field: 'user', header: 'User' },
      { field: 'lastUsedDate', header: 'Last use date' },
    ];
    this.mappingService.getMappingTemplateByHeaders(this.headers).subscribe((temp) => {
      const templates = temp.templates;
      if (templates !== undefined) {
        for (let index = 0; index < templates.length; index++) {
          const template = new MappingTemplate(this.createId(templates[index]), templates[index], 'demo user', new Date(), true, true);
          this.templatesLoaded.push(template);
        }
        this.templatesLoaded = [...this.templatesLoaded, ...this.dataSource]
      }
    })

    this.store.select(selectMappingTemplate)
      .subscribe(res => {
        this.dataSource = res;
        this.loading = false;

      }, err => {
        this.notifService.error('NO');
        this.loading = false
      }, () => {
        this.cdrf.detectChanges()
      });
    forkJoin(
      this.token$.pipe(take(1))
    ).subscribe(([token]) => {
      this.loading = true

    }, () => {
    }, () => {
      this.cdrf.detectChanges()
    })
  }
}
