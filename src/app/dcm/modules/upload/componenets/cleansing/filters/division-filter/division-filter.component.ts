import { Component, ChangeDetectorRef } from '@angular/core';
import { IFilterAngularComp } from '@ag-grid-community/angular';
import { IFilterParams, RowNode, IDoesFilterPassParams, IAfterGuiAttachedParams } from '@ag-grid-enterprise/all-modules';

import { Store } from '@ngrx/store';
import {
  selectCleansingCsMetadata,
  selectCleansingData,
  selectCleansingErrors,
  selectFilterQuickSearch
} from '@app/dcm/modules/upload/store/cleansing/cleansing.selectors';
import {
  ActionLoadAllData, ActionFilterQuickSearch, ActionFilterErrorsByType,
} from '@app/dcm/modules/upload/store/cleansing/cleansing.actions';
import { CleansingService } from '@app/dcm/modules/upload/services/cleansing.service';
import { selectImportObjectState } from '@app/dcm/modules/upload/store/import/import.selectors';
import { AppState } from '@app/core';
import { FileImportService } from '@app/dcm/modules/upload/services/file-import.service';

@Component({
  templateUrl: 'division-filter.component.html',
  styleUrls: ['division-filter.component.scss']
})

export class DivisionFilterComponent implements IFilterAngularComp {
  private params: IFilterParams;
  private valueGetter: (rowNode: RowNode) => any;
  public text: String = '';

  public importData$;
  public csMetadata$;
  public exposures$;
  public datacheck$;
  public operator = '';
  public columnCode;
  public isFilter = false;
  public fileData;
  public selectedSheet;
  public selectedDivision = 'None';
  public newSelectedDivision
  divisions = [
    { id: 'none', name: 'None' },
    { id: 'div1', name: '1' }
  ]

  constructor(private cdrf: ChangeDetectorRef,
    private cleansingService: CleansingService,
    private store$: Store<AppState>, private fileImportService: FileImportService) {
    this.importData$ = this.store$.select(selectImportObjectState);
    this.csMetadata$ = this.store$.select(selectCleansingCsMetadata);
    this.exposures$ = this.store$.select(selectCleansingData);
    this.datacheck$ = this.store$.select(selectCleansingErrors);
  
    this.selectFiltersData(this.store$);

  }
 
  private selectFiltersData(store) {
    store.select(selectFilterQuickSearch).subscribe((data) => {
      if (data) {
        if (data.active) {
          const textTemp = this.getListFilteredColumn(data.contents);
          this.newSelectedDivision = textTemp['value'][0];
          if (this.selectedDivision !== this.newSelectedDivision) {
            if (textTemp['key'][0] === 'division') {
              this.selectedDivision = this.newSelectedDivision;
              this.isFilter = true;
            }
            else {
              this.selectedDivision = 'None';
              this.isFilter = false;
            }
          }
        }
      }
    },
      () => {
        this.cdrf.detectChanges();
      });
  }

  private getListFilteredColumn(listContents) {
    const lists = [];
    const keys = [];
    for (const [key, value] of Object.entries(listContents)) {
      lists.push(value)
      keys.push(key)
    }
    return {key: keys, value: lists};
  }

  agInit(params: IFilterParams): void {
    this.params = params;
    this.valueGetter = params.valueGetter;
  }

  isFilterActive(): boolean {
    return this.text !== null && this.text !== undefined && this.text !== '';
  }

  doesFilterPass(params: IDoesFilterPassParams): boolean {
    return this.text.toLowerCase()
      .split(' ')
      .every((filterWord) => {
        return this.valueGetter(params.node).toString().toLowerCase().indexOf(filterWord) >= 0;
      });
  }

  getModel(): any {
    return { value: this.text };
  }

  setModel(model: any): void {
    this.text = model ? model.value : '';
  }

  afterGuiAttached(params: IAfterGuiAttachedParams): void {
    // this.input.element.nativeElement.focus();
  }

  componentMethod(message: string): void {
    alert(`Alert from PartialMatchFilterComponent ${message}`);
  }

  onSelectElement(event) {
    console.log('##== onFocusInput => ')
    const selectedValue = (<HTMLInputElement>document.getElementById('select-division')).value;
    const columnCodeAg = this.params['column']['colId'];
    this.columnCode = this.getExactColId(columnCodeAg);
    const value = {};
    const listeValue = [];

    this.importData$.subscribe((importData) => {
      this.fileData = importData.fileData;
      this.selectedSheet = importData.selectedSheet;
      if (this.columnCode !== undefined && selectedValue !== '' && this.selectedDivision !== 'None') {
        this.cleansingService.quickSearchByColCode(this.fileData, this.selectedSheet, this.columnCode, selectedValue, this.operator).subscribe((data) => {
          if (data) {
            this.store$.dispatch(new ActionLoadAllData({ data: data }));
            this.isFilter = true;
            value[this.columnCode] = this.selectedDivision;
            listeValue.push(value)
            this.store$.dispatch(new ActionFilterQuickSearch({ quickSearch: { active: true, contents: value } }))
            this.store$.dispatch(new ActionFilterErrorsByType({ typeError: { active: false, type: 'all' } }))
            /* this.cleansingService.getUpdateCheck(this.fileData, this.selectedSheet, data['first_page']).subscribe((check) => {
                this.store$.dispatch(new ActionLoadErrors({ errors: data }));
                }) */
          }
        });
      }
      else if (this.selectedDivision === 'None') {
        this.onClickFilter();
      }
    });
  }

  onClickFilter() {
    console.log('##== onClickBtn event => ')
    if (this.isFilter) {
      // upload all data
      this.cleansingService.getExposures(this.fileData, this.selectedSheet).subscribe((data) => {
        if (data) {
          this.store$.dispatch(new ActionLoadAllData({ data: data }));
          this.isFilter = false;
          this.selectedDivision = 'None';
          this.text = '';

          this.store$.dispatch(new ActionFilterQuickSearch({ quickSearch: { active: false, contents: [] } }))
          this.store$.dispatch(new ActionFilterErrorsByType({ typeError: { active: false, type: 'all' } }))
          /* this.cleansingService.getUpdateCheck(this.fileData, this.selectedSheet, data['first_page']).subscribe((check) => {
              this.store$.dispatch(new ActionLoadErrors({ errors: data }));
          }) */
        }
      })
    }
  }
  public getExactColId(colId) {
    const colId1 = colId.split('_1').slice(0, -1).join('_1');
    if (colId1) {
      colId = colId1;
    }
    return colId;
  }
}

