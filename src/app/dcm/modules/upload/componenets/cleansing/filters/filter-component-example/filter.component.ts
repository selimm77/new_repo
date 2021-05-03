import {Component} from '@angular/core';

// import {GridOptions} from 'ag-grid/main';

import {PartialMatchFilterComponent} from './partial-match-filter.component';
import { GridOptions } from '@ag-grid-enterprise/all-modules';

@Component({
    selector: 'ag-filter-component',
    templateUrl: './filter.component.html'
})
export class FilterComponentComponent {
    public gridOptions: GridOptions;

    constructor() {
        this.gridOptions = <GridOptions>{};
        this.gridOptions.rowData = this.createRowData();
        this.gridOptions.columnDefs = this.createColumnDefs();
        this.gridOptions.enableFilter = true;
        console.log('##== this.createRowData()')
        console.log(this.createRowData())
        console.log('##== this.createColumnDefs()')
        console.log(this.createColumnDefs())
        console.log('##== ')
    }

    onClicked(): void {
        this.gridOptions.api.getFilterInstance('name').getFrameworkComponentInstance().componentMethod('Hello World!');
    }

    private createColumnDefs() {
        return [
            {headerName: 'Row', field: 'row', width: 400},
            {
                headerName: 'Filter Component',
                field: 'name',
                filterFramework: PartialMatchFilterComponent,
                width: 400,
                menuTabs: ['filterMenuTab']
            }
        ];
    }

    private createRowData() {
        return [
            {'row': 'Row 1', 'name': 'Michael Phelps'},
            {'row': 'Row 2', 'name': 'Natalie Coughlin'},
            {'row': 'Row 3', 'name': 'Aleksey Nemov'},
            {'row': 'Row 4', 'name': 'Alicia Coutts'},
            {'row': 'Row 5', 'name': 'Missy Franklin'},
            {'row': 'Row 6', 'name': 'Ryan Lochte'},
            {'row': 'Row 7', 'name': 'Allison Schmitt'},
            {'row': 'Row 8', 'name': 'Natalie Coughlin'},
            {'row': 'Row 9', 'name': 'Ian Thorpe'},
            {'row': 'Row 10', 'name': 'Bob Mill'},
            {'row': 'Row 11', 'name': 'Willy Walsh'},
            {'row': 'Row 12', 'name': 'Sarah McCoy'},
            {'row': 'Row 13', 'name': 'Jane Jack'},
            {'row': 'Row 14', 'name': 'Tina Wills'}
        ];
    }
}