import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {CleansingService} from "@app/dcm/modules/upload/services/cleansing.service";
import {AllModules, Module} from "@ag-grid-enterprise/all-modules";
import {GridOptions} from "ag-grid-community";
import {SortableHeaderComponent} from "@app/dcm/components/header-component/sortable-header.component";
import {HeaderGroupComponent} from "@app/dcm/components/header-group-component/header-group.component";
import * as _ from "lodash";
import {Router} from "@angular/router";
import { FilterPipe } from '@app/shared/pipes/filter.pipe';
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';
import { CATEGORIES, DEFAULT_COLUMN } from '../manage-column/group-column.const';

@Component({
  selector: 'anms-empty-table',
  templateUrl: './empty-table.component.html',
  styleUrls: ['./empty-table.component.scss']
})
export class EmptyTableComponent implements OnInit {


  public columnDefs;
  public rowData;
  public sideBar: any = false;
  public defaultColDef: any;
  public frameworkComponents: any;
  public modules: Module[] = AllModules;
  public datasource;
  public gridColumnApi;
  public gridApi;
  public components;
  public icons;

  public gridOptions: GridOptions;
  public headersLoaded;
  public pivotPanelShow;
   
  newHeadersLoaded;
  public columnState = [];
  public selectedDisplayColumn = [];
  public isManageColumn = false;

  task: any;
  allComplete = false;
  filterPipe = new FilterPipe();
  name : string = '';
  
  
  constructor(
    private cleansingService: CleansingService,
    private cdrf: ChangeDetectorRef,
    private  router: Router
  ) {
    this.gridOptions = <GridOptions>{};


    this.getAllData();

    this.frameworkComponents = {
      sortableHeaderComponent: SortableHeaderComponent,
      headerGroupComponent: HeaderGroupComponent,
    };
    this.defaultColDef = {

      cellStyle: {
        'border-left': '1px solid #cdcdce'
      },
      resizable: true,
      sortable: true,
      editable: true,
      scrollable: true,
      paginator: true,
      filter: 'agTextColumnFilter',
      // headerComponent: 'sortableHeaderComponent',
      headerComponentParams: {
        menuIcon: 'fa-bars'
      }

    };

    this.icons = {
      columns: '<i class="fa fa-handshake"/>'
    };
    this.pivotPanelShow = 'always';

  }

  ngOnInit(): void {
  }

  public goToAdmin() {
    this.router.navigate(['dcm/administration']);
  }

  public getLoadedData() {
    if (this.headersLoaded) {
        // transform header for selected value in manage column
        this.newHeadersLoaded = this.getSelectedColumn(this.columnState, this.headersLoaded);
        
        this.columnDefs = this.createColumnDefs(this.newHeadersLoaded);
      // this.columnDefs = this.createColumnDefs(this.headersLoaded);
      this.gridOptions.api.setRowData([])

      if (this.gridApi) {
        if (this.columnDefs) {

          if (this.gridOptions.api) {
            // this.gridOptions.api.setRowData([])
            //   // transform header for selected value in manage column
            // this.newHeadersLoaded = this.getSelectedColumn(this.columnState, this.headersLoaded);
            // this.columnDefs = this.createColumnDefs(this.newHeadersLoaded);
              // this.newHeadersLoaded = this.getSelectedColumn(this.columnDisplayByDefault, this.headersLoaded);
            // this.columnDefs = this.createColumnDefs(this.newHeadersLoaded);
      
            this.gridOptions.columnDefs = this.columnDefs;
             this.gridOptions.api.setColumnDefs(this.columnDefs);
            // this.gridOptions.api.sizeColumnsToFit();
            this.adjustSizeDataGrid();

            this.gridApi.refreshCells({force: true});

          }

        }

      }
    }
  }

  getSelectedColumn(columnState, headersLoaded) {
    const newHeaders = [];
    const selectedCategorie = [];
    const selectedDisplayColumnTemp = [];

    if (columnState !== undefined && headersLoaded !== undefined) {
      
        for (let j = 0; j < columnState.length; j++) {
          const sLoaded = columnState[j];
          // if (sLoaded['hide'] === false  ) {
            for (let i = 0; i < headersLoaded.length; i++) {
              const hLoaded = headersLoaded[i];
              if ((sLoaded['colId'] === hLoaded['fieldCode']) && (sLoaded['hide'] === false)) {
                newHeaders.push(hLoaded);
                if (!selectedCategorie.includes(hLoaded['categoryName'])) {
                  selectedCategorie.push(hLoaded['categoryName'])
                }
                if (!selectedDisplayColumnTemp.includes(hLoaded['fieldCode'])) {
                  selectedDisplayColumnTemp.push(hLoaded['fieldCode']);
                }
              }
              else if (((sLoaded['colId'] === hLoaded['fieldCode']) && (sLoaded['hide'] === true)) && selectedCategorie.includes(hLoaded['categoryName'])) {
                newHeaders.push(hLoaded);
              }
            }
          // }
        }
        
      }

      this.selectedDisplayColumn = selectedDisplayColumnTemp;

      return newHeaders;
  }

  /* getSelectedColumn(columnDisplayByDefault, headersLoaded) {
    const newHeaders = [];
    if (headersLoaded !== undefined) {

      for (let i = 0; i < headersLoaded.length; i++) {
        const hLoaded = headersLoaded[i];
        if (columnDisplayByDefault.includes(hLoaded['fieldCode'])) {
          newHeaders.push(hLoaded);
        }
      }        
      }
      return newHeaders;
  } */

  dataFiltered(task) {
    let filtered = task.subtask
  
    filtered = this.filterPipe.transform(filtered, 'name', this.name)
    
    return filtered
  }

  categoriesFilter(task) {
    let taskTemp = [];

    if (this.name && this.name !== '') {
      for (let j = 0; j < task.length; j++) {
        let filtered = task[j].subtask;
          filtered = this.filterPipe.transform(filtered, 'name', this.name)
          
        if (filtered.length > 0) {
          // taskTemp[j] = task[j]
          taskTemp.push(task[j]);
        }
      }
      // return task;
      return taskTemp;
    }
    else {
      return task;
    }
  }

  addInlist(list, name) {
    const { length } = list;
    const id = length + 1;
    const found = list.some(el => el.name === name);
    if (!found) list.push({ id, name: name });
    return list;
  }

  public createColumnDefsChildrenStructure(headerName, fieldCode, order) {
    let children;
    let widthColumn;


    if (fieldCode === 'division' || fieldCode === 'location_name') {
      widthColumn = 130;
    } else {
      widthColumn = 140;
    }
    let columnGroupShow;
/* if (this.columnDisplayByDefault.includes(fieldCode)) {
      columnGroupShow = 'close';
  } */
    if (this.selectedDisplayColumn.includes(fieldCode)) {
      columnGroupShow = 'close';
  } else {
      columnGroupShow = 'open';
  }
    /* if (order < 2) {
      columnGroupShow = 'close';


    } else {
      columnGroupShow = 'open';
    } */
    children = {
      headerName: headerName,
      field: fieldCode,
      width: widthColumn,
      expanded: true,
      enableRowGroup: true,
      enablePivot: true,
      editable: false,
      columnGroupShow: columnGroupShow,

    };


    return children;
  }

  public createColumnDefsParentStructure(categoryName, children) {
    const parent = {
      headerName: categoryName,
      scrollable: true,
      collapsable: true,
      headerGroupComponent: 'headerGroupComponent',
      children: children
    };
    return parent;
  }

  public listCategories(headerModel) {
    const flags = [],
      output = [],
      l = headerModel.length;
    for (let i = 0; i < l; i++) {
      if (flags[headerModel[i].categoryName]) continue;
      flags[headerModel[i].categoryName] = true;
      output.push(headerModel[i].categoryName);
    }
    return output;
  }

  public onShowAutoSideBar() {
    if (this.sideBar === false) {
      this.gridApi.openToolPanel('columns');
      this.sideBar = 'columns';
      return true;
    } else {
      this.sideBar = false;
      return false;
    }
  }

  public onShowSideBar() {
    const isVisible = this.onShowAutoSideBar();
    if (this.gridApi.isSideBarVisible() || isVisible) {
       this.openToolPanel('columns');
      this.refreshGrid()

    }
  }

  public groupeFielByCategoryName(headerModels) {
    const grouped = _.mapValues(
      _.groupBy(headerModels, 'categoryName'),
      clist => clist.map(headerModel => _.omit(headerModel, 'categoryName'))
    );
    return grouped;
  }


  refreshGrid() {
    const params = {force: true};
    this.gridApi.refreshCells(params);
  }


  onGridReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    this.gridApi.openToolPanel('columns');
    this.refreshGrid();
    if (this.columnDefs ) {
      if (this.gridOptions.api) {
        this.gridOptions.api.setColumnDefs(this.columnDefs);
        this.gridOptions.api.setRowData([]);
        // this.gridOptions.api.sizeColumnsToFit();
        this.adjustSizeDataGrid();

      }

    }
  }


  adjustSizeDataGrid() {
    if (this.gridOptions.columnApi && this.gridOptions.api) {
      const allDisplayed = this.gridOptions.columnApi.getAllDisplayedColumns();
      if (allDisplayed.length < 9) {
        this.gridOptions.api.sizeColumnsToFit();
      }
    }
  }

  openToolPanel(key) {
    this.gridApi.openToolPanel(key);
  }


  private getAllData() {
    this.cleansingService.getHeadersEmptyTab(1).subscribe((data) => {
      if (data) {
        this.columnState = data['columnState'];
        // this.columnStructure = data['columnStructure'];
        this.task = this.setWorkTaskes(data['columnStructure']);

        this.headersLoaded = this.transformHeaders(data['headers']);
        if (this.headersLoaded && this.task && this.columnState) {
          this.getLoadedData();
        }
      }

    });
  }

  private transformHeaders(headers) {
    const headersMod = [];
    headers.forEach(element => {
      const headersTemp = {
        categoryName: element.category['label'],
        fieldName: element.name,
        fieldCode: element.code,
        fieldOrder: element.inCategoryOrder,
        fieldType: element.dataType
      };
      headersMod.push(headersTemp);
    });
    return headersMod;
  }

  private createColumnDefs(headerModel) {
    let columnDefsTemp;
    const headerCategoryList = this.listCategories(headerModel);

    const headergroupedByCategory = this.groupeFielByCategoryName(headerModel);

    const parents = [];
    for (let i = 0; i < headerCategoryList.length; i++) {
      const categoryName = headerCategoryList[i];
      const children = [];
      const childrens = [];

      for (
        let j = 0;
        j < headergroupedByCategory[headerCategoryList[i]].length;
        j++
      ) {
        children.push(headergroupedByCategory[headerCategoryList[i]][j]);

        childrens.push(
          this.createColumnDefsChildrenStructure(
            children[j]['fieldName'],
            children[j]['fieldCode'],
            j
          )
        );
      }

      parents.push(
        this.createColumnDefsParentStructure(categoryName, childrens)
      );
    }

    const iconsAction = [
      {
        headerName: '',
        field: 'mycheckbox',
        width: 120,
        resizable: false,
        sortable: false,
        filter: false,
        editable: false,
        menuTabs: false,
        scrollable: false,
        paginator: false,
        suppressMenu: true,
        suppressColumnsToolPanel: true,
        cellStyle: {
          'border-left': '0px'
        },
        pinned: true
      },

    ];

    columnDefsTemp = iconsAction;
    columnDefsTemp.push.apply(iconsAction, parents);


    return columnDefsTemp;
  }

  // drag & drop manage column
  drop(event: CdkDragDrop<string[]>,index: number) {
    moveItemInArray(this.task[index].subtask, event.previousIndex, event.currentIndex);
  }

  // checkbox manage column
  updateAllComplete() {
    for (let t = 0; t < this.task.length; t++) {
      const element = this.task[t];
      this.allComplete = this.task[t].subtask != null && this.task[t].subtask.every(t => t.checked);
    }
  }

  someComplete(): boolean {
    for (let tsk = 0; tsk < this.task.length; tsk++) {
      if (this.task[tsk].subtask == null) {
        return this.task[tsk].checked && !this.allComplete;
        // return false;
      }
      return this.task[tsk].subtask.filter(t => t.checked).length > 0 && !this.allComplete;
    }
  }

  setAll(checked: boolean, checkedIndex: number) {
    if (this.task[checkedIndex].checked) {
      this.task[checkedIndex].checked = false;
      checked = false;
    }
    else {
      this.task[checkedIndex].checked = true;
      checked = true;
    }
      if (this.task[checkedIndex].subtask == null) {
            return;
          }
          if (this.task[checkedIndex].subtask.length > 0) {
            this.task[checkedIndex].subtask.forEach(t => t.checked = checked);
          }
  }

  setAllTree(checked: boolean) {
    for (let tsk = 0; tsk < this.task.length; tsk++) {
      this.allComplete = checked;
      this.task[tsk].checked = checked
          if (this.task[tsk].subtask == null) {
            return;
          }
          this.task[tsk].subtask.forEach(t => t.checked = checked);
    }
  }

  // popup manage column
  onManageColumn() {
    this.task = this.onSortCategorie(this.task)
    this.isManageColumn = true;
  }

  onSortCategorie(categories) {
    const sortCategories = [];
    const sortCategoriesNotInList = [];
    let index = 0;
    for (let i = 0; i < CATEGORIES.length; i++) {
      const elemnt1 = CATEGORIES[i];
      for (let j = 0; j < categories.length; j++) {
        const elemnt2 = categories[j];
        if (elemnt1 === elemnt2['code']) {
          sortCategories[index] = elemnt2;
          index++;
        }
        if (!CATEGORIES.includes(elemnt2['code']) && !sortCategoriesNotInList.includes(elemnt2)) {
          sortCategoriesNotInList.push(elemnt2)
        }
      }
    }
    const newCategories = sortCategories.concat(sortCategoriesNotInList)
    
    return newCategories;
  }

  setWorkTaskes(cols) {
    const outPut = [];
    for (let i = 0; i < cols.length; i++) {
      const subtask = [];
      const cat = cols[i];
      for (let j = 0; j < cat['subtask'].length; j++) {
        const hed = cat['subtask'][j];
          if (DEFAULT_COLUMN.includes(hed['code'])) {
            subtask.push({
            name: hed['name'],
            code: hed['code'],
            checked: true
          })
          }
          else {
            subtask.push({
              name: hed['name'],
              code: hed['code'],
              checked: false
            })
          }
      }
      outPut.push({
        name: cat['name'],
        code: cat['code'],
        checked: false,
        subtask: subtask
      });
    }
    return outPut;
  }

  handleOkManageColumn() {
    this.isManageColumn = false;
    const cols = this.task;
    const columnState = [];
    for (let i = 0; i < cols.length; i++) {
      const categories = cols[i];
      for (let j = 0; j < categories['subtask'].length; j++) {
        const column = categories['subtask'][j];
        columnState.push({
          colId: column['code'],
          hide: !column['checked']
        })

      }
    }
    if (isDefined(columnState)) {
      this.columnState = columnState;
      this.getLoadedData();
    }
  }

    handleResetManageColumn() {
      this.isManageColumn = false;
    }
  
    handleOutsideClick() {
      console.log('click outside')
    }

  handleCancelManageColumn() {
    this.isManageColumn = false;
  }

}

function isDefined(elements) {
  let isDef = false;
  if (elements !== undefined && elements !== null && elements !== '' && elements !== {}) {
    isDef = true;
  }
  return isDef;
}
