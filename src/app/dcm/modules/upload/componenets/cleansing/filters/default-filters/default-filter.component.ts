import { Component, ChangeDetectorRef} from '@angular/core';
import { IFilterAngularComp } from '@ag-grid-community/angular';
import { IFilterParams, RowNode, IDoesFilterPassParams, IAfterGuiAttachedParams } from '@ag-grid-enterprise/all-modules';

import { FormGroup, FormBuilder } from '@angular/forms';
import { debounceTime, startWith } from 'rxjs/operators';
import { combineLatest } from 'rxjs';

import { Store } from '@ngrx/store';
import {
    selectCleansingCsMetadata,
    selectCleansingData,
    selectCleansingErrors,
    selectFilterQuickSearch
} from '@app/dcm/modules/upload/store/cleansing/cleansing.selectors';
import {
    ActionLoadAllData, ActionFilterQuickSearch, ActionFilterErrorsByType, ActionLoadErrors,
} from '@app/dcm/modules/upload/store/cleansing/cleansing.actions';
import { CleansingService } from '@app/dcm/modules/upload/services/cleansing.service';
import { selectImportObjectState } from '@app/dcm/modules/upload/store/import/import.selectors';
import { AppState } from '@app/core';
import { FileImportService } from '@app/dcm/modules/upload/services/file-import.service';


@Component({
    templateUrl: 'default-filter.component.html',
    styleUrls: ['default-filter.component.scss'],
    selector: 'filter-cell'
})
export class DefaultFilterComponent implements IFilterAngularComp {
    private params: IFilterParams;
    private valueGetter: (rowNode: RowNode) => any;
    public text: String = '';

    form: FormGroup;
    txt: String;
    newTxt: String;
    public importData$;
    public csMetadata$;
    public exposures$;
    public datacheck$;
    public operator = '';
    public columnCode;
    public isFilter = false;
    public fileData;
    public selectedSheet;
    private waiting = 1000; // 1 second

    constructor(private cdrf: ChangeDetectorRef, private cleansingService: CleansingService, private store$: Store<AppState>, private fileImportService: FileImportService, fb: FormBuilder) {
        
        this.importData$ = this.store$.select(selectImportObjectState);
        this.csMetadata$ = this.store$.select(selectCleansingCsMetadata);
        this.exposures$ = this.store$.select(selectCleansingData);
        this.datacheck$ = this.store$.select(selectCleansingErrors);

            this.form = fb.group({
            txt: '',
            checkbox: false
        });

        this.selectFiltersData(store$);

        combineLatest(
            this.form
                .get('txt')
                .valueChanges.pipe(
                    debounceTime(this.waiting),
                    startWith('')),
            this.form.get('checkbox').valueChanges.pipe(startWith(false)),
            (txt, check) => ({ txt, check })
        ).subscribe(criteria => {
            this.txt = criteria['txt'];
            const value = {};
            const listeValue = [];
            this.importData$.subscribe((importData) => {
                this.fileData = importData.fileData;
                this.selectedSheet = importData.selectedSheet;
                if (this.columnCode !== undefined && this.txt !== null && this.txt !== undefined && this.txt !== '') {
                    /* console.log('default filter => ');
                    console.log(this.txt) */
                    this.cleansingService.quickSearchByColCode(this.fileData, this.selectedSheet, this.columnCode , this.txt, this.operator).subscribe((data) => {
                        if (data) {
                            this.store$.dispatch(new ActionLoadAllData({ data: data }));
                            this.isFilter = true;
                            value[this.columnCode] = this.txt;
                            listeValue.push(value)
                            this.store$.dispatch(new ActionFilterQuickSearch({ quickSearch: { active: true, contents: value} }))
                            this.store$.dispatch(new ActionFilterErrorsByType({ typeError: { active: false, type: 'all' } }))
                            this.cleansingService.getUpdateCheck(this.fileData, this.selectedSheet, data['first_page']).subscribe((check) => {
                                // console.log('check after filter')
                                // console.log(check);
                                this.store$.dispatch(new ActionLoadErrors({ errors: check }));
                            })
                            /* this.cleansingService.getUpdateCheck(this.fileData, this.selectedSheet, data['first_page']).subscribe((check) => {
                                this.store$.dispatch(new ActionLoadErrors({ errors: data }));
                                }) */
                        }
                    });
                }
                
            });
        });
    }

    selectFiltersData(store) {
        store.select(selectFilterQuickSearch).subscribe((data) => {
            
            if (data) {
                if (data.active) {
                    const textTemp = this.getListFilteredColumn(data.contents);
                    this.newTxt = textTemp[0];
                    if (this.txt !== this.newTxt) {
                        this.txt = '';
                        this.isFilter = false;
                    }
                    // this.isFilter = data.active;
                }
                else {
                    this.txt = '';
                    this.isFilter = false;
                }
            }
        },
            () => {
                this.cdrf.detectChanges();
            });
    }

    private getListFilteredColumn(listContents) {
        const lists = [];
        for (const [key, value] of Object.entries(listContents)) {
            lists.push(value)
        }
        return lists;
    }

    // @ViewChild('input', {read: ViewContainerRef}) public input;

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
        return {value: this.text};
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

    onChange(newValue): void {
        if (this.text !== newValue) {
            this.text = newValue;
        }
    }
    onFocusInput(event) {
        const columnCodeAg = this.params['column']['colId'];
        this.columnCode = this.getExactColId(columnCodeAg);
    }

    onClickFilter(event) {
        // console.log('default filter onClickFilter => ')
        if (this.isFilter) {
            // upload all data
            this.cleansingService.getExposures(this.fileData, this.selectedSheet).subscribe((data) => {
                if (data) {
                    this.store$.dispatch(new ActionLoadAllData({ data: data }));
                    this.isFilter = false;
                    this.txt = '';

                    this.store$.dispatch(new ActionFilterQuickSearch({ quickSearch: { active: false, contents: [] } }))
                    this.store$.dispatch(new ActionFilterErrorsByType({ typeError: { active: false, type: 'all' } }))
                    /* this.cleansingService.getUpdateCheck(this.fileData, this.selectedSheet, data['first_page']).subscribe((check) => {
                        console.log('check after filter')
                        console.log(check);
                        this.store$.dispatch(new ActionLoadErrors({ errors: check }));
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
