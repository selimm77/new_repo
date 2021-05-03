import { ChangeDetectorRef, Component, OnDestroy} from '@angular/core';
import { IHeaderGroupParams } from '@ag-grid-enterprise/all-modules';
import { IHeaderGroupAngularComp } from '@ag-grid-community/angular';
import {
  selectCleansingCsMetadata,
  selectCleansingData,
  selectCleansingErrors,
  selectFilterErrorsByType
} from '@app/dcm/modules/upload/store/cleansing/cleansing.selectors';
import {
  ActionLoadAllData, ActionFilterErrorsByType, ActionFilterQuickSearch,
} from '@app/dcm/modules/upload/store/cleansing/cleansing.actions';
import {CleansingService} from '@app/dcm/modules/upload/services/cleansing.service';
import {selectImportObjectState} from '@app/dcm/modules/upload/store/import/import.selectors';
import {GridOptions} from '@ag-grid-enterprise/all-modules';
import {AppState} from '@app/core';
import {FileImportService} from '@app/dcm/modules/upload/services/file-import.service';
import {Store} from '@ngrx/store';

@Component({
  templateUrl: 'dropdown-error-filter.component.html',
  styleUrls: ['dropdown-error-filter.component.scss']
})
export class DropdownErrorFilterComponent implements OnDestroy, IHeaderGroupAngularComp {
public importData$;
  public csMetadata$;
  public exposures$;
  public datacheck$;
  public isFirstLoad = 1;
  public gridOptions: GridOptions;
  public self$;
  private params: any;
  private gridApi;
  public filtersInfo: any;
  public selectedTypeErrors = 'All';
  typeErrors = [
    { id: 'all', name: 'All' },
    { id: 'errors', name: 'Errors' },
    { id: 'warnings', name: 'Warnings' }
  ]

  constructor(private cdrf: ChangeDetectorRef,
              private cleansingService: CleansingService,
              private store$: Store<AppState>, private fileImportService: FileImportService) {

    this.gridOptions = <GridOptions>{};

    this.importData$ = this.store$.select(selectImportObjectState);
    this.csMetadata$ = this.store$.select(selectCleansingCsMetadata);
    this.exposures$ = this.store$.select(selectCleansingData);
    this.datacheck$ = this.store$.select(selectCleansingErrors);

    this.selectFiltersData(this.store$)

  }

  private selectFiltersData(store) {
    store.select(selectFilterErrorsByType).subscribe((data) => {
      if (data) {
        if (data.active) {
          this.selectedTypeErrors = this.getValueElement(this.typeErrors, data.type);
        }
      }
    },
      () => {
        this.cdrf.detectChanges();
      });
  }

    agInit(params: IHeaderGroupParams): void {
        this.params = params;
        // filter-division this.params.columnGroup.getOriginalColumnGroup().addEventListener('expandedChanged', this.onExpandChanged.bind(this));
    }

    ngOnDestroy() {
        // console.log(`Destroying HeaderGeocodeComponent`);
    }

  onSelectElement(selectedElement) {
    console.log('onSelectElement: Filter by type error')
    let isFilter = false;
    let value = (<HTMLInputElement>document.getElementById('select-type')).value;
    value = this.getIdElement(this.typeErrors, value);
    if (value !== 'all') {
      isFilter = true;
    }
    this.getFilters(isFilter, value);
  }

  getFilters(isFilter, value) {
    this.importData$.subscribe((importData) => {
      const fileData = importData.fileData;
      const selectedSheet = importData.selectedSheet;
      this.cleansingService.getExposuresByErrorType(fileData, selectedSheet, value).subscribe((data) => {
        console.log('Filter by type error')
        if (data) {
          this.store$.dispatch(new ActionLoadAllData({ data: data }));
          this.store$.dispatch(new ActionFilterErrorsByType({ typeError: { active: isFilter, type: value } }))
          this.store$.dispatch(new ActionFilterQuickSearch({ quickSearch: { active: false, contents: {} } }))
          this.cdrf.detectChanges();
        }
      });
    });
  }

  getIdElement(list, value) {
    for (let i = 0; i < list.length; i++) {
      if (list[i].name === value) {
        return list[i].id
      }
    }
    return null;
  }
  getValueElement(list, id) {
    for (let i = 0; i < list.length; i++) {
      if (list[i].id === id) {
        return list[i].name
      }
    }
    return null;
  }
}

